const SchemaHandler = require('../../dist/src/Schema/Schema').SchemaHandler;
const ModelHandler = require('../../dist/src/Model/Model').ModelHandler;
const connectToDb = require('../../dist/src/Utils/ConnectToDb').connectToDB;
const disconnectFromDb = require('../../dist/src/Utils/DisconnectFromDb').disconnectFromDb;
const dropDatabase = require('../../dist/src/Utils/DropDatabase').dropDatabase;

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


const createDocuments = async () => {
	await modelHandler.createMany([{
		name: 'Reece',
		age: 24
	}, {
		name: 'Jessica Moorey',
		age: 24
	}]);
};


(async () => {
	await createDocuments();
	//Shows can still use native methods from mongoose.
	const documents = await model.find();
	console.log('allDocuments>', documents);

	const foundDocuments = await modelHandler.findMany({
		age: 24
	});
	console.log('foundDocuments>', foundDocuments);

	const updatedDocument = await modelHandler.updateOne({name: 'Reece'}, {age: 25});
	console.log('updatedDocument>', updatedDocument);

	const deletedDocument = await modelHandler.deleteOne(updatedDocument._id);
	console.log('deletedDocument>', deletedDocument);

	await dropDatabase();
	await disconnectFromDb();
})();
