const SchemaHandler = require('../dist/src/Schema/Schema').SchemaHandler;
const ModelHandler = require('../dist/src/Model/Model').ModelHandler;
const connectToDb = require('../dist/src/Utils/ConnectToDb').connectToDB;
const disconnectFromDb = require('../dist/src/Utils/DisconnectFromDb').disconnectFromDb;

connectToDb('mongodb://localhost:27017/test').then(() => console.log('connected')).catch((error) => console.log('error', error));


//TODO test the attach functions on the schema handler.
const schemaHandler = new SchemaHandler({name: String, age: Number});

const virtualFunction = function () {
	this.nameAndAge = this.name + " " + this.age;
};

schemaHandler.attachVirtuals([{virtualFunction, virtualName: "nameAndAge", virtualType: "get"}]);

const schema = schemaHandler.getSchema();

const modelHandler = new ModelHandler(schema, 'People');
const model = modelHandler.getModel();


const createDocument = async () => {
	await modelHandler.createMany([{
		name: 'Reece',
		age: 24
	}, {
		name: 'Jessica Moorey',
		age: 24
	}]);
};

createDocument();


const getDocuments = async () => {
	return await model.find();
};

getDocuments().then(documents => console.log('documents>', documents));


const findMany = async () => {
	return await modelHandler.findMany({
		age: 24
	});
};

findMany().then(foundDocuments => console.log('found docs>', foundDocuments));

const findOne = async () => {
	return modelHandler.updateOne({name: 'Reece'}, {age: 25});
};

findOne().then(updated => console.log('updated doc>', updated));

const findOneAndDelete = async () => {
	return modelHandler.deleteOne(await findOne()._id);
};

findOneAndDelete().then(deleted => console.log('delected doc>', deleted));


// disconnectFromDb().then(() => console.log('disconnected>')).catch(error => console.log('disconnectingError>', error));
