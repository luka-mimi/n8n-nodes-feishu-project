import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import NodeUtils from '../../../help/utils/NodeUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const WorkItemInstanceReviewUpdateOperate: ResourceOperations = {
	name: '修改评审结论和评审意见',
	value: 'work_item_instance:review_update',
	options: [
		{
			displayName: '请求体参数',
			name: 'body',
			type: 'json',
			default: JSON.stringify({
				"project_key": "",
				"work_item_id": 0,
				"node_id": "",
				"opinion": "",
				"finished_conclusion_option_key": "",
				"operation_type": "",
				"reset": true
			}, null, 2),
			description: '完整的请求体参数，JSON格式',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const bodyParam = this.getNodeParameter('body', index) as string;
		const body: IDataObject = NodeUtils.parseJsonParameter(bodyParam, '请求体参数');

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open_api/work_item/finished/update`,
			body: body,
		});
	}
};

export default WorkItemInstanceReviewUpdateOperate;
