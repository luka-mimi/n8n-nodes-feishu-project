import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const WorkItemConfigBaseInfoGetOperate: ResourceOperations = {
	name: '获取工作项基础信息配置',
	value: 'work_item_config:base_info_get',
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
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const project_key = this.getNodeParameter('project_key', index) as string;
		const work_item_type_key = this.getNodeParameter('work_item_type_key', index) as string;

		return RequestUtils.request.call(this, {
			method: 'GET',
			url: `/open_api/${project_key}/work_item/type/${work_item_type_key}`,
		});
	}
};

export default WorkItemConfigBaseInfoGetOperate;
