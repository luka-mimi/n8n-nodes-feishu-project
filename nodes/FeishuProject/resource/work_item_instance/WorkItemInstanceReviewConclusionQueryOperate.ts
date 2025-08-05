import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import NodeUtils from '../../../help/utils/NodeUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const WorkItemInstanceReviewConclusionQueryOperate: ResourceOperations = {
	name: '评审结论标签值查询',
	value: 'work_item_instance:review_conclusion_query',
	options: [
		{
			displayName: '请求体参数',
			name: 'body',
			type: 'json',
			default: JSON.stringify({
				"project_key": "",
				"work_item_id": 0,
				"node_ids": [""]
			}, null, 2),
			description: '完整的请求体参数，JSON格式',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const bodyParam = this.getNodeParameter('body', index) as string;
		const body: IDataObject = NodeUtils.parseJsonParameter(bodyParam, '请求体参数');

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open_api/work_item/finished/query_conclusion_option`,
			body: body,
		});
	}
};

export default WorkItemInstanceReviewConclusionQueryOperate;
