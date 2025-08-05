import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const MeasureChartDetailOperate: ResourceOperations = {
	name: '获取度量图表明细数据',
	value: 'measure:chart_detail',
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
			displayName: '图表ID',
			name: 'chart_id',
			type: 'string',
			required: true,
			default: '',
			description: '图表的唯一标识ID',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const project_key = this.getNodeParameter('project_key', index) as string;
		const chart_id = this.getNodeParameter('chart_id', index) as string;

		return RequestUtils.request.call(this, {
			method: 'GET',
			url: `/open_api/${project_key}/measure/${chart_id}`,
		});
	}
};

export default MeasureChartDetailOperate;
