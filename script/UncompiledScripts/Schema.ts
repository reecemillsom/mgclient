import {SchemaHandler, Type} from "../../src/Schema/Schema";
import {SchemaDefinition} from "mongoose";

const schemaHandler = new SchemaHandler({name: String, age: Number});

console.log('schemaHandler>', schemaHandler);


const virtualMethod = () => {
	this.nameAngAge = 'foo' + 'bar';
};

const instanceMethod = () => {
	console.log('foo>');
};

const staticMethod = () => {
	console.log('bar>');
};

const queryMethod = () => {
	console.log('baz>');
};

schemaHandler.attachVirtuals([{virtualFunction: virtualMethod, virtualType: Type.Get, virtualName: 'nameAndAge'}]);
schemaHandler.attachMethods([{methodFunction: instanceMethod, methodName: 'instanceMethod'}]);
schemaHandler.attachStatics([{staticFunction: staticMethod, staticName: 'staticMethod'}]);
schemaHandler.attachQueryHelpers([{queryFunction: queryMethod, queryName: 'queryMethod'}]);

const schemaDefinition = schemaHandler.getSchema();

console.log('schemaDefinition>', schemaDefinition);
