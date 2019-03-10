import {model, Model, Schema} from "mongoose";

export class ModelHandler {

	readonly model: Model<any>; //TODO not to sure what type it expects. Might need to make use of generics here.

	constructor(private schema: Schema, private modelName: string) {
		this.model = model(modelName, schema);
	}

	public getModel() {
		return this.model;
	}

}
