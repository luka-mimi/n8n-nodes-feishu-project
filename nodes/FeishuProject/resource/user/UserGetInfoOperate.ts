import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import NodeUtils from '../../../help/utils/NodeUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const UserGetInfoOperate: ResourceOperations = {
	name: '查询用户信息',
	value: 'user:query',
	options: [
		{
			displayName: '请求体参数',
			name: 'body',
			type: 'json',
			default: JSON.stringify({
				"user_keys": [""],
				"out_ids": [""],
				"emails": [""],
				"tenant_key": ""
			}, null, 2),
			description: '完整的请求体参数，JSON格式',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const bodyParam = this.getNodeParameter('body', index) as string;
		const body: IDataObject = NodeUtils.parseJsonParameter(bodyParam, '请求体参数');

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open_api/user/query`,
			body: body,
		});
	}
};

export default UserGetInfoOperate;
