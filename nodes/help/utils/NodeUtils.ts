import {IDataObject, IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

class NodeUtils {

	static getNodeFixedCollection(data: IDataObject, collectionName: string): IDataObject[] {
		return data[collectionName] as IDataObject[] || [];
	}

	static getNodeFixedCollectionList(data: IDataObject, collectionName: string, propertyName: string): any[] {
		const list = this.getNodeFixedCollection(data, collectionName);

		const result: IDataObject[] = [];
		for (const item of list) {
			// @ts-ignore
			result.push(item[propertyName]);
		}

		return result;
	}

	static async buildUploadFileData(this: IExecuteFunctions, inputDataFieldName: string, index: number = 0) {
		const binaryData = this.helpers.assertBinaryData(index, inputDataFieldName);
		if (!binaryData){
			throw new Error('未找到二进制数据');
		}
		const buffer = await this.helpers.getBinaryDataBuffer(index, inputDataFieldName);

		return {
			value: buffer,
			options: {
				filename: binaryData.fileName,
				filelength: binaryData.fileSize,
				contentType: binaryData.mimeType,
			},
		};
	}


	static getNodeJsonData(data: IExecuteFunctions, propertyName: string, index: number, failValue?: any): any {
		const text = data.getNodeParameter(propertyName, index, failValue);
		if (!text) {
			return failValue;
		}
		try {
			// @ts-ignore
			return JSON.parse(text);
		} catch (e) {
			throw new NodeOperationError(data.getNode(), `无法解析字段[${propertyName}] JSON 数据: ${e.message}`);
		}
	}

	/**
	 * 解析JSON参数，提供统一的错误处理
	 * @param jsonString JSON字符串
	 * @param parameterName 参数名称（用于错误信息）
	 * @returns 解析后的对象
	 */
	static parseJsonParameter(jsonString: string, parameterName: string = '参数'): IDataObject {
		try {
			return JSON.parse(jsonString);
		} catch (error) {
			throw new Error(`${parameterName}格式错误，请使用有效的JSON格式: ${error.message}`);
		}
	}
}

export default NodeUtils;
