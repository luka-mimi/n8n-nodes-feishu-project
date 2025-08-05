import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialDataDecryptedObject,
	ICredentialType,
	IHttpRequestHelper,
	INodeProperties,
	IHttpRequestMethods,
} from 'n8n-workflow';

export class FeishuProjectApi implements ICredentialType {
	name = 'feishuProjectApi';
	displayName = '飞书项目 API';
	documentationUrl = 'https://project.feishu.cn/b/helpcenter/1p8d7djs/4bsmoql6';
	// @ts-ignore
	icon = 'file:icon.svg';
	properties: INodeProperties[] = [
		{
			displayName: '飞书项目host',
			name: 'baseUrl',
			type: 'string',
			default: 'project.feishu.cn',
			required: true,
			description: '飞书项目的基础host地址，只需要输入host，不需要输入https://',
		},
		{
			displayName: '插件ID',
			name: 'pluginId',
			type: 'string',
			default: '',
			required: true,
			description: '飞书项目插件的ID',
		},
		{
			displayName: '插件密钥',
			name: 'pluginSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: '飞书项目插件的密钥',
		},
		{
			displayName: '用户ID',
			name: 'userId',
			type: 'string',
			default: '',
			required: true,
			description: '用户的唯一ID，用于X-USER-KEY头部',
		},
		{
			displayName: '插件Token',
			name: 'pluginToken',
			type: 'hidden',
			default: '',
			typeOptions: {
				expirable: true,
			},
		},
	];

	// 认证配置 - 在实际请求中自动添加必要的头部信息
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'User-Agent': 'N8N-FeishuProject/1.0.0',
				'X-USER-KEY': '={{$credentials.userId}}',
				'X-PLUGIN-TOKEN': '={{$credentials.pluginToken}}',
			},
		},
	};

	async preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) {
		const res = (await this.helpers.httpRequest({
			method: 'POST',
			baseURL: `https://${credentials.baseUrl}`,
			url: '/open_api/authen/plugin_token',
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': 'N8N-FeishuProject/1.0.0',
			},
			body: {
				plugin_id: credentials.pluginId,
				plugin_secret: credentials.pluginSecret,
			},
			json: true,
		})) as any;

		if (!res?.data?.token) {
			throw new Error(`授权失败：${res?.error?.code || 'UNKNOWN'}, ${res?.error?.msg || '未知错误'}`);
		}
		return { pluginToken: res.data.token };
	}


	// 测试连接配置 - 通过获取plugin_token来验证credentials是否有效
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{"https://" + $credentials.baseUrl}}',
			url: '/open_api/authen/plugin_token',
			method: 'POST' as IHttpRequestMethods,
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': 'N8N-FeishuProject/1.0.0',
			},
			body: {
				plugin_id: '={{$credentials.pluginId}}',
				plugin_secret: '={{$credentials.pluginSecret}}',
			},
			json: true,
		},
		rules: [
			{
				type: 'responseSuccessBody',
				properties: {
					key: 'error.code',
					value: 10204,
					message: '飞书项目API认证失败，请检查插件ID和插件密钥',
				},
			},
		],
	};
}
