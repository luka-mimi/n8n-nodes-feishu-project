import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const ViewDeleteOperate: ResourceOperations = {
	name: '删除视图',
	value: 'view:delete',
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
			displayName: '视图ID',
			name: 'view_id',
			type: 'string',
			required: true,
			default: '',
			description: '视图的唯一标识ID',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const project_key = this.getNodeParameter('project_key', index) as string;
		const view_id = this.getNodeParameter('view_id', index) as string;

		return RequestUtils.request.call(this, {
			method: 'DELETE',
			url: `/open_api/${project_key}/fix_view/${view_id}`,
		});
	}
};

export default ViewDeleteOperate;
