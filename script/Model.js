const SchemaHandler = require('../dist/src/Schema/Schema').SchemaHandler;
const ModelHandler = require('../dist/src/Model/Model').ModelHandler;
const connectToDb = require('../dist/src/Utils/ConnectToDb').connectToDB;

connectToDb('mongodb://localhost:27017/test').then(() => console.log('connected')).catch((error) => console.log('error', error));


//TODO test the attach functions on the schema handler.
const schemaHandler = new SchemaHandler({name: String, age: Number});

const virtualFunction = function () {
	this.nameAndAge = this.name + " " + this.age;
};

schemaHandler.attachVirtuals([{virtualFunction, virtualName: "nameAndAge", virtualType: "get"}]);

const schema = schemaHandler.getSchema();
console.log('schema>', schema);

const modelHandler = new ModelHandler(schema, 'People');
const model = modelHandler.getModel();


const createDocument = async () => {
	await model.create([{
		name: 'Reece',
		age: 24
	}, {
		name: 'Jessica Moorey',
		age: 60
	}]);
};

createDocument();


const getDocuments = async () => {
	return await model.find();
};

getDocuments().then(documents => console.log('documents>', documents));
