import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import NodeUtils from '../../../help/utils/NodeUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const WorkItemInstanceSearchSingleSpaceOperate: ResourceOperations = {
	name: '获取指定的工作项列表（单空间）',
	value: 'work_item_instance_search:single_space',
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
			displayName: '请求体参数',
			name: 'body',
			type: 'json',
			default: JSON.stringify({
				"work_item_name": "",
				"user_keys": [""],
				"work_item_ids": [0],
				"work_item_type_keys": [""],
				"created_at": {
					"start": 0,
					"end": 0
				},
				"updated_at": {
					"start": 0,
					"end": 0
				},
				"sub_stages": [""],
				"businesses": [""],
				"priorities": [""],
				"tags": [""],
				"page_num": 1,
				"page_size": 10,
				"work_item_status": [
					{
						"state_key": "",
						"is_archived_state": true,
						"is_init_state": true,
						"updated_at": 1654063482000,
						"updated_by": "",
						"history": [{}]
					}
				],
				"expand": {
					"need_workflow": true,
					"relation_fields_detail": true,
					"need_multi_text": true,
					"need_user_detail": true,
					"need_sub_task_parent": true
				},
				"search_id": ""
			}, null, 2),
			description: '完整的请求体参数，JSON格式',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const project_key = this.getNodeParameter('project_key', index) as string;
		const bodyParam = this.getNodeParameter('body', index) as string;

		const body: IDataObject = NodeUtils.parseJsonParameter(bodyParam, '请求体参数');

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open_api/${project_key}/work_item/filter`,
			body: body,
		});
	}
};

export default WorkItemInstanceSearchSingleSpaceOperate;
