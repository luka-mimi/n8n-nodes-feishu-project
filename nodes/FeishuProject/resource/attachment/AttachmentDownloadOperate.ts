import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const AttachmentDownloadOperate: ResourceOperations = {
	name: '下载附件',
	value: 'attachment:download',
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
			displayName: '文件UUID',
			name: 'uuid',
			type: 'string',
			required: true,
			default: '',
			description: '文件的唯一标识UUID',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const project_key = this.getNodeParameter('project_key', index) as string;
		const work_item_id = this.getNodeParameter('work_item_id', index) as string;
		const uuid = this.getNodeParameter('uuid', index) as string;

		const body: IDataObject = {
			uuid: uuid || '',
		};

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open_api/${project_key}/work_item/story/${work_item_id}/file/download`,
			body: body,
		});
	}
};

export default AttachmentDownloadOperate;
