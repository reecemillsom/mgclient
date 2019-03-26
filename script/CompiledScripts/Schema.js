const Schema = require('../../dist/src/Schema/Schema').SchemaHandler;

const schemaHandler = new Schema({name: String, age: Number}); //Works.

console.log('schemaHandler1>', schemaHandler);

// const schema2 = new Schema({}); //Works how expected with return error.

// console.log('schema2>', schema2);

// const schema3 = new Schema(null); //Works how expected with error.

// console.log('schema3>', schema3);

const virtualFunc = function () {
	this.nameAndAge = this.name + this.age;
};

const methodFunc = function () {
	console.log('methodFunc>');
};

const staticFunc = function () {
	console.log('staticFunc>');
};

const queryFunc = function () {
	console.log('queryFunc>');
};


schemaHandler.attachVirtuals([{virtualFunction: virtualFunc, virtualType: 'get', virtualName: 'nameAndAge'}]);

schemaHandler.attachMethods([{methodFunction: methodFunc, methodName: 'methodFunc'}]);

schemaHandler.attachStatics([{staticFunction: staticFunc, staticName: 'staticFunc'}]);

schemaHandler.attachQueryHelpers([{queryFunction: queryFunc, queryName: 'queryFunc'}]);

const schema = schemaHandler.getSchema();

console.log('schema>', schema);



