import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import NodeUtils from '../../../help/utils/NodeUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const WorkItemConfigRelationCreateOperate: ResourceOperations = {
	name: '新增工作项关系',
	value: 'work_item_config:relation_create',
	options: [
		{
			displayName: '请求体参数',
			name: 'body',
			type: 'json',
			default: JSON.stringify({
				"project_key": "",
				"work_item_type_key": "",
				"name": "",
				"relation_details": [
					{
						"work_item_type_key": "",
						"work_item_type_name": "",
						"project_key": "",
						"project_name": ""
					}
				]
			}, null, 2),
			description: '完整的请求体参数，JSON格式',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const bodyParam = this.getNodeParameter('body', index) as string;
		const body: IDataObject = NodeUtils.parseJsonParameter(bodyParam, '请求体参数');

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open_api/work_item/relation/create`,
			body: body,
		});
	}
};

export default WorkItemConfigRelationCreateOperate;
