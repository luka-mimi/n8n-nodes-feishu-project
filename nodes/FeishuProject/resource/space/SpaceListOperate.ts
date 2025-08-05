import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import NodeUtils from '../../../help/utils/NodeUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const SpaceListOperate: ResourceOperations = {
	name: '获取空间列表',
	value: 'space:list',
	options: [
		{
			displayName: '请求体参数',
			name: 'body',
			type: 'json',
			default: JSON.stringify({
				"user_key": "",
				"tenant_group_id": 0,
				"asset_key": "",
				"order": [""]
			}, null, 2),
			description: '完整的请求体参数，JSON格式。user_key留空时将使用凭据中的用户ID',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const bodyParam = this.getNodeParameter('body', index) as string;
		const body: IDataObject = NodeUtils.parseJsonParameter(bodyParam, '请求体参数');

		// 如果用户没有提供user_key，则使用凭据中的userId
		if (!body.user_key) {
			const credentials = await this.getCredentials('feishuProjectApi');
			body.user_key = credentials.userId as string;
		}

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open_api/projects`,
			body: body,
		});
	}
};

export default SpaceListOperate;
