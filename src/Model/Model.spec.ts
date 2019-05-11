import {expect} from 'chai';
import {ModelHandler} from "./Model";
import {SchemaHandler} from "../Schema/Schema";
import {connectToDb} from "../Utils/ConnectToDb";
import {disconnectFromDb} from "../Utils/DisconnectFromDb";
import {dropDatabase} from "../Utils/DropDatabase";

describe("ModelHandler", () => {

	before(async () => {

		await connectToDb('mongodb://localhost:27017/model-test');

	});

	after(async () => {

		await dropDatabase();

		await disconnectFromDb();

	});

	describe("when initialised", () => {

		it("will create a model with a passed in schema", () => {

			const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

			const schema = schemaHandler.getSchema();

			const modelHandler: ModelHandler = new ModelHandler(schema, 'modelName');

			expect(modelHandler.model).to.be.a('function');

		});

	});

	describe("when asked to get the model", () => {

		it("will return the model instance", () => {

			const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

			const schema = schemaHandler.getSchema();

			const modelHandler: ModelHandler = new ModelHandler(schema, 'modelName2');

			expect(modelHandler.getModel()).to.equal(modelHandler.model);

		});

	});

	describe("when asked to create documents", () => {

		it("will accept an array of documents and create accordingly", async () => {

			const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

			const schema = schemaHandler.getSchema();

			const modelHandler: ModelHandler = new ModelHandler(schema, 'modelName3');

			const result = await modelHandler.createMany([{name: 'Reece', age: 24}, {name: 'Jess', age: 23}]);

			expect(result).to.have.length(2);


		});

	});

	describe("when asked to find documents", () => {

		it("will return the documents based on the filter", async () => {

			const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

			const schema = schemaHandler.getSchema();

			const modelHandler: ModelHandler = new ModelHandler(schema, 'modelName4');

			await modelHandler.createMany([{name: 'Reece', age: 24}]);

			const result = await modelHandler.findMany({
				name: {
					$in: ['Reece']
				}
			});

			expect(result).to.have.length(1);

		});

		describe("when passed a projection", () => {

			it("will find the document and only pass the projected fields back", async () => {

				const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

				const schema = schemaHandler.getSchema();

				const modelHandler: ModelHandler = new ModelHandler(schema, 'modelName5');

				await modelHandler.createMany([{name: 'Reece', age: 24}, {name: 'Jess', age: 24}]);

				const result = await modelHandler.findMany({
					age: 24
				}, {
					name: 1
				});

				expect(result[0]).to.contain({
					name: 'Reece'
				});

				expect(result[1]).to.contain({
					name: 'Jess'
				});

				expect(result[0]).not.to.contain({
					age: 24
				});

				expect(result[1]).not.to.contain({
					age: 24
				});

			});

		});

	});

	describe("when asked to find a document by id", () => {

		it("will find document based on the id", async () => {

			const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

			const schema = schemaHandler.getSchema();

			const modelHandler: ModelHandler = new ModelHandler(schema, 'modelName6');

			const created = await modelHandler.createMany([{name: 'Reece', age: 24}]);

			const result = await modelHandler.findById(created[0]._id);

			expect(result._id.toString()).to.equal(created[0]._id.toString());

		});

		describe("when passed a projection", () => {

			it("will find the document and only pass the projected fields back", async () => {

				const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

				const schema = schemaHandler.getSchema();

				const modelHandler: ModelHandler = new ModelHandler(schema, 'modelName7');

				const created = await modelHandler.createMany([{name: 'Reece', age: 24}]);

				const result = await modelHandler.findById(created[0]._id, {age: 1});

				expect(result).to.contain({
					age: 24
				});

				expect(result).to.not.contain({
					name: 'Reece'
				});

			});

		});

	});

	describe("when asked to update a single document", () => {

		it("will update the targeted person with the update field information", async () => {

			const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

			const schema = schemaHandler.getSchema();

			const modelHandler: ModelHandler = new ModelHandler(schema, 'modelName8');

			const created = await modelHandler.createMany([{name: 'Reece', age: 24}, {name: 'Jess', age: 23}]);

			const result = await modelHandler.updateOne({
				_id: created[0]._id
			}, {
				age: 25,
			});

			expect(result).to.contain({
				name: 'Reece',
				age: 24
			});

		});

	});

	describe("when asked to update many documents", () => {

		it("will update the documents where the filter meets", async () => {

			const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

			const schema = schemaHandler.getSchema();

			const modelHandler: ModelHandler = new ModelHandler(schema, 'modelName9');

			await modelHandler.createMany([{name: 'Reece', age: 24}, {name: 'Jess', age: 24}]);

			const result = await modelHandler.updateMany({
				age: 24
			}, {
				age: 25
			});

			expect(result.n).to.equal(2);

		});

	});

	describe("when asked to delete a single document", () => {

		it("will return the deleted document", async () => {

			const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

			const schema = schemaHandler.getSchema();

			const modelHandler: ModelHandler = new ModelHandler(schema, 'modelName10');

			const created = await modelHandler.createMany([{name: 'Reece', age: 24}]);

			const result = await modelHandler.deleteOne({
				_id: created[0]._id
			}, {
				new: true
			});

			expect(result).to.contain({
				name: 'Reece',
				age: 24,
				deleted: true
			});

		});

	});

	describe("when asked to delete many documents", () => {

		it("will find the many documents to remove", async () => {

			const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

			const schema = schemaHandler.getSchema();

			const modelHandler: ModelHandler = new ModelHandler(schema, 'modelName11');

			await modelHandler.createMany([{name: 'Reece', age: 24}, {name: 'Jess', age: 23}]);

			const result = await modelHandler.deleteMany({
				name: {
					$in: ['Reece', 'Jess']
				}
			});

			expect(result.n).to.equal(2);

		});

	});

	describe("when asked to paginate", () => {

		it("will return the correct results", async () => {

			const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

			const schema = schemaHandler.getSchema();

			const modelHandler = new ModelHandler(schema, 'modelName12');

			await modelHandler.createMany([{name: 'Reece', age: 24}, {name: 'Jess', age: 23}, {
				name: 'Bob',
				age: 30
			}, {name: 'Bobble head', age: 19}]);

			const result = await modelHandler.paginate({page: 1, pageSize: 3});

			expect(result[0]).to.include({
				name: 'Bobble head',
				age: 19
			});

			expect(result[1]).to.include({
				name: 'Bob',
				age: 30
			});

			expect(result[2]).to.include({
				name: 'Jess',
				age: 23
			});

		});

		it("will return the correct results when on a different page number", async () => {

			const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

			const schema = schemaHandler.getSchema();

			const modelHandler = new ModelHandler(schema, 'modelName13');

			await modelHandler.createMany([{name: 'Reece', age: 24}, {name: 'Jess', age: 23}, {
				name: 'Bob',
				age: 30
			}, {name: 'Bobble head', age: 19}]);

			const result = await modelHandler.paginate({page: 2, pageSize: 3});

			expect(result[0]).to.include({
				name: 'Bobble head',
				age: 19
			});

			expect(result[1]).to.include({
				name: 'Bob',
				age: 30
			});

			expect(result[2]).to.include({
				name: 'Jess',
				age: 23
			});

			expect(result[3]).to.include({
				name: 'Reece',
				age: 24
			});

		});

		it("will return the correct results when passed an ascending sort", async () => {

			const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

			const schema = schemaHandler.getSchema();

			const modelHandler = new ModelHandler(schema, 'modelName14');

			await modelHandler.createMany([{name: 'Reece', age: 24}, {name: 'Jess', age: 23}, {
				name: 'Bob',
				age: 30
			}, {name: 'Bobble head', age: 19}]);

			const result = await modelHandler.paginate({page: 1, pageSize: 3}, {}, null, true);

			expect(result[0]).to.include({
				name: 'Reece',
				age: 24
			});

			expect(result[1]).to.include({
				name: 'Jess',
				age: 23
			});

			expect(result[2]).to.include({
				name: 'Bob',
				age: 30
			});

		});

		it("when given an _id and an ascending sort, will return the correct results", async () => {

			const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

			const schema = schemaHandler.getSchema();

			const modelHandler = new ModelHandler(schema, 'modelName15');

			const results = await modelHandler.createMany([{name: 'Reece', age: 24}, {name: 'Jess', age: 23}, {
				name: 'Bob',
				age: 30
			}, {name: 'Bobble head', age: 19}]);

			const lastId = results[1]._id;

			const result = await modelHandler.paginate({page: 1, pageSize: 3}, {}, lastId, true);

			expect(result[0]).to.include({
				name: 'Bob',
				age: 30
			});

			expect(result[1]).to.include({
				name: 'Bobble head',
				age: 19
			});

		});

		it("when asked to paginate it should take into account the base query", async () => {

			const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

			const schema = schemaHandler.getSchema();

			const modelHandler = new ModelHandler(schema, 'modelName16');

			await modelHandler.createMany([{name: 'Reece', age: 24}, {name: 'Jess', deleted: true, age: 23}, {
				name: 'Bob',
				age: 30
			}, {name: 'Bobble head', age: 19}]);

			const result = await modelHandler.paginate({page: 1, pageSize: 5});

			expect(result[0]).to.include({
				name: 'Bobble head',
				age: 19
			});

			expect(result[1]).to.include({
				name: 'Bob',
				age: 30
			});

			expect(result[2]).to.include({
				name: 'Reece',
				age: 24
			});

		});

		it("when passed a filter will also return results based on that", async () => {

			const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

			const schema = schemaHandler.getSchema();

			const modelHandler = new ModelHandler(schema, 'modelName17');

			await modelHandler.createMany([{name: 'Reece', age: 19}, {name: 'Jess', deleted: true, age: 23}, {
				name: 'Bob',
				age: 30
			}, {name: 'Bobble head', age: 19}]);


			const results = await modelHandler.paginate({page: 1, pageSize: 3}, {age: 19});

			expect(results[0]).to.include({
				name: 'Bobble head',
				age: 19
			});

			expect(results[1]).to.include({
				name: 'Reece',
				age: 19
			});

			expect(results).to.have.length(2);

		});

	});

});
