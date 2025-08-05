import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const CommentDeleteOperate: ResourceOperations = {
	name: '删除评论',
	value: 'comment:delete',
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
		{
			displayName: '工作项ID',
			name: 'work_item_id',
			type: 'string',
			required: true,
			default: '',
			description: '工作项的唯一标识ID',
		},
		{
			displayName: '评论ID',
			name: 'comment_id',
			type: 'string',
			required: true,
			default: '',
			description: '评论的唯一标识ID',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const project_key = this.getNodeParameter('project_key', index) as string;
		const work_item_type_key = this.getNodeParameter('work_item_type_key', index) as string;
		const work_item_id = this.getNodeParameter('work_item_id', index) as string;
		const comment_id = this.getNodeParameter('comment_id', index) as string;

		return RequestUtils.request.call(this, {
			method: 'DELETE',
			url: `/open_api/${project_key}/work_item/${work_item_type_key}/${work_item_id}/comment/${comment_id}`,
		});
	}
};

export default CommentDeleteOperate;
