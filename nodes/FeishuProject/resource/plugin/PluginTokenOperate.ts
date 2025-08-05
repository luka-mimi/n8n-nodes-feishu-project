import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const PluginTokenOperate: ResourceOperations = {
	name: '获取Plugin_token',
	value: 'plugin:token',
	options: [
		// 不需要用户输入任何参数，所有参数都从凭据中获取
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		// 从凭据中获取plugin_id和plugin_secret
		const credentials = await this.getCredentials('feishuProjectApi');

		const body: IDataObject = {
			plugin_id: credentials.pluginId as string,
			plugin_secret: credentials.pluginSecret as string,
		};

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open_api/authen/plugin_token`,
			body: body,
		});
	}
};

export default PluginTokenOperate;
