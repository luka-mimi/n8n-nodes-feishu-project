import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const WorkflowConfigTemplateDeleteOperate: ResourceOperations = {
	name: '删除流程模板',
	value: 'workflow_config:template_delete',
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
			displayName: '模板ID',
			name: 'template_id',
			type: 'string',
			required: true,
			default: '',
			description: '模板的唯一标识ID',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const project_key = this.getNodeParameter('project_key', index) as string;
		const template_id = this.getNodeParameter('template_id', index) as string;

		return RequestUtils.request.call(this, {
			method: 'DELETE',
			url: `/open_api/template/v2/delete_template/${project_key}/${template_id}`,
		});
	}
};

export default WorkflowConfigTemplateDeleteOperate;
