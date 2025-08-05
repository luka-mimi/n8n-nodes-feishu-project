import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import NodeUtils from '../../../help/utils/NodeUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const WorkflowNodeOperateOperate: ResourceOperations = {
	name: '节点完成/回滚',
	value: 'workflow_node:operate',
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
			displayName: '工作项类型Key',
			name: 'work_item_type_key',
			type: 'string',
			required: true,
			default: '',
			description: '工作项类型的唯一标识Key',
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
			displayName: '节点ID',
			name: 'node_id',
			type: 'string',
			required: true,
			default: '',
			description: '节点的唯一标识ID',
		},
		{
			displayName: '请求体参数',
			name: 'body',
			type: 'json',
			default: JSON.stringify({
				"action": "",
				"rollback_reason": "",
				"node_owners": [""],
				"node_schedule": {
					"points": 0,
					"estimate_start_date": 1724169600000,
					"estimate_end_date": 1724428799999,
					"owners": [""],
					"actual_work_time": 0,
					"is_auto": true
				},
				"schedules": [
					{
						"points": 0,
						"estimate_start_date": 1724169600000,
						"estimate_end_date": 1724428799999,
						"owners": [""],
						"actual_work_time": 0,
						"is_auto": true
					}
				],
				"fields": [
					{
						"field_key": "",
						"field_value": "",
						"target_state": {
							"state_key": "",
							"transition_id": 0
						},
						"field_type_key": "",
						"field_alias": "",
						"help_description": ""
					}
				],
				"role_assignee": [
					{
						"role": "",
						"name": "",
						"owners": [""],
						"exist": true
					}
				]
			}, null, 2),
			description: '完整的请求体参数，JSON格式',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const project_key = this.getNodeParameter('project_key', index) as string;
		const work_item_type_key = this.getNodeParameter('work_item_type_key', index) as string;
		const work_item_id = this.getNodeParameter('work_item_id', index) as string;
		const node_id = this.getNodeParameter('node_id', index) as string;
		const bodyParam = this.getNodeParameter('body', index) as string;
		const body: IDataObject = NodeUtils.parseJsonParameter(bodyParam, '请求体参数');

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open_api/${project_key}/workflow/${work_item_type_key}/${work_item_id}/node/${node_id}/operate`,
			body: body,
		});
	}
};

export default WorkflowNodeOperateOperate;
