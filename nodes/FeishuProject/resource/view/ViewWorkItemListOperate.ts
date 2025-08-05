import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const ViewWorkItemListOperate: ResourceOperations = {
	name: '获取视图下工作项列表',
	value: 'view:work_item_list',
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
		{
			displayName: '页码',
			name: 'page_num',
			type: 'string',
			default: '0',
			description: '页码，从0开始',
		},
		{
			displayName: '页大小',
			name: 'page_size',
			type: 'string',
			default: '0',
			description: '每页条数',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const project_key = this.getNodeParameter('project_key', index) as string;
		const view_id = this.getNodeParameter('view_id', index) as string;
		const page_num = this.getNodeParameter('page_num', index) as string;
		const page_size = this.getNodeParameter('page_size', index) as string;

		return RequestUtils.request.call(this, {
			method: 'GET',
			url: `/open_api/${project_key}/fix_view/${view_id}?page_num=${page_num}&page_size=${page_size}`,
		});
	}
};

export default ViewWorkItemListOperate;
