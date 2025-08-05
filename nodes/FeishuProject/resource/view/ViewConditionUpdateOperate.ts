import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import NodeUtils from '../../../help/utils/NodeUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const ViewConditionUpdateOperate: ResourceOperations = {
	name: '更新条件视图',
	value: 'view:condition_update',
	options: [
		{
			displayName: '请求体参数',
			name: 'body',
			type: 'json',
			default: JSON.stringify({
				"project_key": "",
				"work_item_type_key": "",
				"search_group": {
					"search_params": [
						{
							"param_key": "",
							"value": "",
							"operator": ""
						}
					],
					"conjunction": "",
					"search_groups": [{}]
				},
				"cooperation_mode": 0,
				"cooperation_user_keys": [""],
				"cooperation_team_ids": [0],
				"name": "",
				"view_id": ""
			}, null, 2),
			description: '完整的请求体参数，JSON格式',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const bodyParam = this.getNodeParameter('body', index) as string;
		const body: IDataObject = NodeUtils.parseJsonParameter(bodyParam, '请求体参数');

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open_api/view/v1/update_condition_view`,
			body: body,
		});
	}
};

export default ViewConditionUpdateOperate;
