import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import NodeUtils from '../../../help/utils/NodeUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const WorkflowConfigTemplateUpdateOperate: ResourceOperations = {
	name: '更新流程模板',
	value: 'workflow_config:template_update',
	options: [
		{
			displayName: '请求体参数',
			name: 'body',
			type: 'json',
			default: JSON.stringify({
				"project_key": "",
				"template_id": 0,
				"workflow_confs": [
					{
						"state_key": "",
						"name": "",
						"tags": [""],
						"owner_usage_mode": 0,
						"owner_roles": [""],
						"owners": [""],
						"need_schedule": true,
						"different_schedule": true,
						"visibility_usage_mode": 0,
						"deletable": true,
						"deletable_operation_role": [""],
						"pass_mode": 0,
						"is_limit_node": true,
						"done_operation_role": [""],
						"done_schedule": true,
						"done_allocate_owner": true,
						"action": 0,
						"pre_node_state_key": [""],
						"completion_tips": "",
						"task_confs": [
							{
								"action": 0,
								"name": "",
								"id": "",
								"deliverable_field_id": "",
								"pass_mode": 0,
								"node_pass_required_mode": 0
							}
						],
						"belong_status": "",
						"done_actual_point": true,
						"is_milestone": true,
						"done_finish_time": true,
						"fields": [
							{
								"is_required": 0,
								"is_visibility": 0,
								"role_assign": [
									{
										"role": "",
										"name": "",
										"default_appear": 0,
										"deletable": 0,
										"member_assign": 0,
										"members": [""]
									}
								],
								"field_name": "",
								"field_key": "",
								"field_alias": "",
								"field_type_key": "",
								"default_value": {
									"default_appear": 0,
									"value": ""
								},
								"options": [
									{
										"label": "",
										"value": "",
										"is_disabled": 0,
										"is_visibility": 0,
										"children": [{}]
									}
								],
								"compound_fields": [{}],
								"is_validity": 0,
								"label": "",
								"work_item_relation": {
									"id": "",
									"name": "",
									"disabled": true,
									"work_item_type_key": "",
									"work_item_type_name": "",
									"relation_details": [
										{
											"work_item_type_key": "",
											"work_item_type_name": "",
											"project_key": "",
											"project_name": ""
										}
									],
									"relation_type": 0
								},
								"field_uuid": "",
								"free_add": true,
								"field_tips": "",
								"sub_type_level_mode": "",
								"sub_type_level_class": 0
							}
						],
						"sub_work_items": [
							{
								"name": "",
								"relation_uuid": "",
								"relation_name": "",
								"work_item_type_key": "",
								"work_item_type_name": ""
							}
						],
						"sub_tasks": [
							{
								"name": "",
								"owner_usage_mode": 0,
								"owner_roles": [""],
								"owners": [""]
							}
						]
					}
				],
				"state_flow_confs": [
					{
						"state_key": "",
						"name": "",
						"state_type": 0,
						"authorized_roles": [""],
						"confirm_form_list": [
							{
								"action": 0,
								"state_key": ""
							}
						],
						"action": 0
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
			method: 'PUT',
			url: `/open_api/template/v2/update_template`,
			body: body,
		});
	}
};

export default WorkflowConfigTemplateUpdateOperate;
