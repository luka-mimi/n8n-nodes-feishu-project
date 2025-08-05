import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import NodeUtils from '../../../help/utils/NodeUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const WorkItemInstanceOpRecordOperate: ResourceOperations = {
	name: '获取工作项操作记录',
	value: 'work_item_instance:op_record',
	options: [
		{
			displayName: '请求体参数',
			name: 'body',
			type: 'json',
			default: JSON.stringify({
				"project_key": "",
				"work_item_ids": [0],
				"start_from": "",
				"operator": [""],
				"operator_type": [""],
				"source_type": [""],
				"source": [""],
				"operation_type": [""],
				"start": 0,
				"end": 0,
				"op_record_module": [""],
				"page_size": 10
			}, null, 2),
			description: '完整的请求体参数，JSON格式',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const bodyParam = this.getNodeParameter('body', index) as string;
		const body: IDataObject = NodeUtils.parseJsonParameter(bodyParam, '请求体参数');

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open_api/op_record/work_item/list`,
			body: body,
		});
	}
};

export default WorkItemInstanceOpRecordOperate;
