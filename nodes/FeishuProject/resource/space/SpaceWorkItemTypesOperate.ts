import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const SpaceWorkItemTypesOperate: ResourceOperations = {
	name: '获取空间下工作项类型',
	value: 'space:work_item_types',
	options: [
		{
			displayName: '项目Key',
			name: 'project_key',
			type: 'string',
			required: true,
			default: '',
			description: '项目的唯一标识Key',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const project_key = this.getNodeParameter('project_key', index) as string;

		return RequestUtils.request.call(this, {
			method: 'GET',
			url: `/open_api/${project_key}/work_item/all-types`,
		});
	}
};

export default SpaceWorkItemTypesOperate;
