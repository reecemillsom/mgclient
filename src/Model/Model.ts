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

	public async paginate(pageInformation: Page, startId?: ObjectId, isAscendingSort?: boolean) {

		const filter = this.getFilter(startId, isAscendingSort);
		const sort = this.getPaginationSort(isAscendingSort);

		return await this.model.find(filter)
			.limit(pageInformation.page * pageInformation.pageSize)
			.sort(sort);

	}

	private getFilter(startId: ObjectId, isAscendingSort: boolean) {
		if (!startId) {
			return {
				...this.baseQuery
			};
		}

		return !isAscendingSort ? {...this.baseQuery, _id: {$lt: startId}} : {...this.baseQuery, _id: {$gt: startId}}
	}

	private getPaginationSort(isAscendingSort: boolean) {

		return !isAscendingSort ? {_id: -1} : {_id: 1};

	}

}
