import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import NodeUtils from '../../../help/utils/NodeUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const WorkItemInstanceBatchUpdateOperate: ResourceOperations = {
	name: '批量更新工作项字段值',
	value: 'work_item_instance:batch_update',
	options: [
		{
			displayName: '请求体参数',
			name: 'body',
			type: 'json',
			default: JSON.stringify({
				"project_key": "",
				"work_item_type_key": "",
				"work_item_ids": [0],
				"update_mode": "",
				"field_key": "",
				"before_field_value": "",
				"after_field_value": ""
			}, null, 2),
			description: '完整的请求体参数，JSON格式',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const bodyParam = this.getNodeParameter('body', index) as string;
		const body: IDataObject = NodeUtils.parseJsonParameter(bodyParam, '请求体参数');

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open_api/work_item/batch_update`,
			body: body,
		});
	}
};

export default WorkItemInstanceBatchUpdateOperate;
