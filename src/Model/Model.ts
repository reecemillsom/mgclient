import {model, Model, Schema} from "mongoose";
import {ObjectId} from "bson";

export interface Page {
	page: number;
	pageSize: number;
}

export class ModelHandler {

	readonly model: Model<any>; //TODO not to sure what type it expects. Might need to make use of generics here.

	private baseQuery = {};

	constructor(private schema: Schema, private modelName: string, baseQuery?: object) {
		this.model = model(modelName, schema);
		this.baseQuery = {
			...baseQuery,
			deleted: {$ne: true}
		};
	}

	public getModel() {
		return this.model;
	}

	public async createMany(documents: any[], options?: object) {
		return await this.model.create(documents, options);
	}

	public async findById(id: ObjectId, projection?: object, options?: object) {
		return await this.model.findById(id, {
			...projection
		}, {
			...options
		});
	}

	public async findMany(filter: object, projection?: object, options?: object) {
		return await this.model.find({
			...this.baseQuery,
			...filter
		}, {
			...projection
		}, {
			...options
		});
	}

	public async updateOne(filter: object, updatedFields: object, options?: object) {
		return await this.model.findOneAndUpdate({
			...this.baseQuery,
			...filter
		}, {
			...updatedFields
		}, {
			...options
		});
	}

	public async updateMany(filter: object, updatedFields: object, options?: object) {
		return await this.model.updateMany({
			...this.baseQuery,
			...filter
		}, {
			...updatedFields
		}, {
			...options
		})
	}

	public async deleteOne(filter: object, options?: object) {
		return await this.model.findOneAndUpdate({
			...this.baseQuery,
			...filter
		}, {
			deleted: true
		}, {
			...options
		});
	}

	public async deleteMany(filter: object, options?: object) {
		return await this.model.updateMany({
			...this.baseQuery,
			...filter
		}, {
			deleted: true
		}, {
			...options
		});
	}

	public async paginate(pageInformation: Page, filter: object = {}, startId?: ObjectId, isAscendingSort?: boolean) {

		const findFilter = this.getFilter(filter, startId, isAscendingSort);
		const sort = this.getPaginationSort(isAscendingSort);

		return await this.model.find(findFilter)
			.limit(pageInformation.page * pageInformation.pageSize)
			.sort(sort);

	}

	private getFilter(filter: object, startId: ObjectId, isAscendingSort: boolean) {
		if (!startId) {
			return {
				...this.baseQuery,
				...filter
			};
		}

		return !isAscendingSort ? {...this.baseQuery, ...filter, _id: {$lt: startId}} : {
			...this.baseQuery, ...filter,
			_id: {$gt: startId}
		}
	}

	private getPaginationSort(isAscendingSort: boolean) {

		return !isAscendingSort ? {_id: -1} : {_id: 1};

	}

}
