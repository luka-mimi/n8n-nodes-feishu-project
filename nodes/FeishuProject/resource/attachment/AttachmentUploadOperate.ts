import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const AttachmentUploadOperate: ResourceOperations = {
	name: '添加附件',
	value: 'attachment:upload',
	options: [
		{
			displayName: '项目Key',
			name: 'project_key',
			type: 'string',
			required: true,
			default: '',
			description: '项目的唯一标识Key',
		},
		{
			displayName: '工作项ID',
			name: 'work_item_id',
			type: 'string',
			required: true,
			default: '',
			description: '工作项的唯一标识ID',
		},
		{
			displayName: '二进制数据字段名',
			name: 'binaryPropertyName',
			type: 'string',
			required: true,
			default: 'data',
			description: '包含要上传文件的二进制数据字段名',
		},
		{
			displayName: '字段Key',
			name: 'field_key',
			type: 'string',
			required: true,
			default: '',
			description: '字段的唯一标识Key',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const project_key = this.getNodeParameter('project_key', index) as string;
		const work_item_id = this.getNodeParameter('work_item_id', index) as string;
		const binaryPropertyName = this.getNodeParameter('binaryPropertyName', index) as string;
		const field_key = this.getNodeParameter('field_key', index) as string;

		// 获取二进制数据信息
		const items = this.getInputData();
		const binaryData = items[index].binary;

		if (!binaryData || !binaryData[binaryPropertyName]) {
			throw new Error(`在索引 ${index} 的项目中未找到二进制数据 "${binaryPropertyName}"`);
		}

		const fileInfo = binaryData[binaryPropertyName];

		// 获取实际的二进制数据Buffer
		const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(
			index,
			binaryPropertyName,
		);

		// 构造正确的FormData格式
		const formData: IDataObject = {
			file: {
				value: binaryDataBuffer,
				options: {
					filename: fileInfo.fileName || 'file',
					contentType: fileInfo.mimeType || 'application/octet-stream',
				},
			},
			field_key: field_key,
		};

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open_api/${project_key}/work_item/story/${work_item_id}/file/upload`,
			formData: formData,
			json: true,
		});
	}
};

export default AttachmentUploadOperate;
