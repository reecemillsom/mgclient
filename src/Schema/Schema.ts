import {Schema, SchemaDefinition, SchemaOptions} from "mongoose";
import {forEach} from 'lodash';

export enum Type {
	Get = 'get',
	Set = 'set'
}

export interface Virtual {
	virtualFunction: any; //TODO this will be a function reference, see if there is a way around any type.
	virtualName: string;
	virtualType: Type;
}

//TODO potentially think of better name than schema handler.
//TODO will need a public getSchema function so user can actually return it.
export class SchemaHandler {

	readonly schema: Schema;

	constructor(definition: SchemaDefinition, schemaOptions?: SchemaOptions) {
		this.schema = this.handleSchemaInitialisation(definition, schemaOptions);
	}

	public attachVirtuals(virtuals: Virtual[]) {

		forEach(virtuals, virtual => {

			this.schema.virtual(virtual.virtualName)[virtual.virtualType](virtual.virtualFunction);

		});

	}

	private handleSchemaInitialisation(definition: SchemaDefinition, schemaOptions?: SchemaOptions): Schema {

		this.handleErrorCases(definition);

		return new Schema(definition, schemaOptions);

	}

	private handleErrorCases(definition: SchemaDefinition) {

		if (!definition) {
			throw new Error('Invalid argument for definition parameter');
		}

		if (Array.isArray(definition) || typeof definition !== 'object') {
			throw new Error('Invalid schema type, must be an object');
		}

		if (Object.keys(definition).length === 0) {
			throw new Error('Invalid argument, definition object must contain contents');
		}

	}

}



