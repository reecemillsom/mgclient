import {model, Model, Schema} from "mongoose";
import {ObjectId} from "bson";

export class ModelHandler {

	readonly model: Model<any>; //TODO not to sure what type it expects. Might need to make use of generics here.

	constructor(private schema: Schema, private modelName: string) {
		this.model = model(modelName, schema);
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
			...filter
		}, {
			...projection
		}, {
			...options
		});
	}

	public async updateOne(filter: object, updatedFields: object, options?: object) {
		return await this.model.findOneAndUpdate({
			...filter
		}, {
			...updatedFields
		}, {
			new: true,
			...options
		});
	}

	public async deleteOne(filter: object, options?: object) {
		return await this.model.findOneAndDelete({
			...filter
		}, {
			...options
		})
	}

}
