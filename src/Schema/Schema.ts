import { Schema, SchemaDefinition, SchemaOptions } from "mongoose";


export function getSchema(definition: SchemaDefinition, schemaOptions?: SchemaOptions): Schema {

	handleErrorCases(definition);

	return new Schema(definition, schemaOptions);

}

function handleErrorCases(definition: SchemaDefinition) {

	if (!definition) {
	  throw new Error('Invalid argument for document parameter');
	}

	if (Array.isArray(definition) || typeof definition !== 'object') {
	  throw new Error('Invalid schema type, must be an object');
	}

	if (Object.keys(definition).length === 0) {
	  throw new Error('Invalid argument, document object must contain contents');
	}

}
