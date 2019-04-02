const connectToDb = require('../../dist/src/Utils/ConnectToDb').connectToDB;
const disconnectFromDb = require('../../dist/src/Utils/DisconnectFromDb').disconnectFromDb;
const dropDatabase = require('../../dist/src/Utils/DropDatabase').dropDatabase;
const dropCollection = require('../../dist/src/Utils/DropCollection').dropCollection;
const dropMultipleCollections = require('../../dist/src/Utils/DropCollection').dropMultipleCollections;
const ModelHandler = require('../../dist/src/Model/Model').ModelHandler;

const SchemaHandler = require('../../dist/src/Schema/Schema').SchemaHandler;

connectToDb('mongodb://localhost:27017/test').then(connected => console.log('connected', connected)).catch(error => console.log('error>', error));

(async () => {

	const userSchema = new SchemaHandler({name: String, age: Number});
	const productSchema = new SchemaHandler({stockLevel: Number, price: Number});

	const user = userSchema.getSchema();
	const product = productSchema.getSchema();

	console.log('user>', user);
	console.log('product>', product);

	new ModelHandler(user, 'User');
	new ModelHandler(product, 'Product');

	await dropCollection('users');
	await dropMultipleCollections(['products']);
	//
	// await dropDatabase('test');

	await disconnectFromDb();
})();
