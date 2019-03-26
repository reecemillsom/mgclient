import {SchemaHandler} from "../../src/Schema/Schema";
import {ModelHandler} from "../../src/Model/Model";
import {connectToDB} from "../../src/Utils/ConnectToDb";
import {disconnectFromDb} from "../../src/Utils/DisconnectFromDb";
import {dropDatabase} from "../../src/Utils/DropDatabase";

connectToDB('mongodb://localhost:27017/test').then(() => console.log('connected')).catch((error) => console.log('error', error));

const schemaHandler = new SchemaHandler({name: String, age: Number});

const schema = schemaHandler.getSchema();

const modelHandler = new ModelHandler(schema, 'People');

const createDocuments = async () => {
	return await modelHandler.createMany([{
		name: 'Reece',
		age: 24
	}, {
		name: 'Jessica Moorey',
		age: 24
	}]);
};

(async () => {
	const documents = await createDocuments();
	console.log('documents>', documents);
	await dropDatabase();
	await disconnectFromDb();
})();




