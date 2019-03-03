import { Schema, SchemaDefinition, SchemaOptions } from "mongoose";


//TODO potentially think of better name than schema handler.
export default class SchemaHandler {

  readonly schema: Schema;

  constructor(definition: SchemaDefinition, schemaOptions?: SchemaOptions) {
    this.schema = this.handleSchemaInitialisation(definition, schemaOptions);
  }

  //TODO think about whether a way for easily adding virtuals, methods etc to the schema is viable.
  //TODO this will probably mean changing this to a class.
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



