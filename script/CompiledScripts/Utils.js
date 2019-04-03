const connectToDb = require('../../dist/src/Utils/ConnectToDb').connectToDB;
const disconnectFromDb = require('../../dist/src/Utils/DisconnectFromDb').disconnectFromDb;
const dropDatabase = require('../../dist/src/Utils/DropDatabase').dropDatabase;
const dropCollection = require('../../dist/src/Utils/DropCollection').dropCollection;
const dropMultipleCollections = require('../../dist/src/Utils/DropCollection').dropMultipleCollections;
const ModelHandler = require('../../dist/src/Model/Model').ModelHandler;
const SchemaHandler = require('../../dist/src/Schema/Schema').SchemaHandler;


(async () => {

	await connectToDb('mongodb://localhost:27017/test');

	const userSchema = new SchemaHandler({name: String, age: Number});
	const productSchema = new SchemaHandler({stockLevel: Number, price: Number});

	const user = userSchema.getSchema();
	const product = productSchema.getSchema();

	const userModelHandler = new ModelHandler(user, 'User');

	await userModelHandler.createMany([{name: 'Steve', age: 24}]);

	const productModelHandler = new ModelHandler(product, 'Product');

	await productModelHandler.createMany([{stockLevel: 5, price: 10}]);

	// await dropCollection('users'); //This does work also, just testing dropping multiple same time below.

	await dropMultipleCollections(['products', 'users']);

	await dropDatabase('test');

	await disconnectFromDb();
})();
