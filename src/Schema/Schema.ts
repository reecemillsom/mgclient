import { Schema, SchemaDefinition, SchemaOptions } from "mongoose";


export function getSchema(definition: SchemaDefinition, schemaName: string, schemaOptions?: SchemaOptions): Schema {

	handleErrorCases(definition, schemaName);

	return new Schema(definition, schemaOptions);

}

function handleErrorCases(definition: SchemaDefinition, schemaName: string) {

	if (!definition) {
	  throw new Error('Invalid argument for document parameter');
	}

	if (Object.keys(definition).length === 0) {
	  throw new Error('Invalid argument, document object must contain contents');
	}

	if (!schemaName) {
	  throw new Error('Invalid schema name, this is needed for creating a schema');
	}

}
