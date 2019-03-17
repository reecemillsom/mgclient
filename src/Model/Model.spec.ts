import {expect} from 'chai';
import {ModelHandler} from "./Model";
import {SchemaHandler} from "../Schema/Schema";
import {connectToDB} from "../Utils/ConnectToDb";
import {disconnectFromDb} from "../Utils/DisconnectFromDb";

describe("ModelHandler", () => {

	before(async () => {

		await connectToDB('mongodb://localhost:27017/model-test');

	});

	//TODO destroy the collections created.
	after(async () => {

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

			const result = await modelHandler.createMultiple([{name: 'Reece', age: 24}, {name: 'Jess', age: 23}]);

			expect(result).to.have.length(2);


		});

	});

	describe("when asked to find documents", () => {

		it("will return the documents based on the filter", async () => {

			const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

			const schema = schemaHandler.getSchema();

			const modelHandler: ModelHandler = new ModelHandler(schema, 'modelName4');

			await modelHandler.createMultiple([{name: 'Reece', age: 24}]);

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

				await modelHandler.createMultiple([{name: 'Reece', age: 24}, {name: 'Jess', age: 24}]);

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

			const created = await modelHandler.createMultiple([{name: 'Reece', age: 24}]);

			const result = await modelHandler.findById(created[0]._id);

			expect(result._id.toString()).to.equal(created[0]._id.toString());

		});

		describe("when passed a projection", () => {

			it("will find the document and only pass the projected fields back", async () => {

				const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

				const schema = schemaHandler.getSchema();

				const modelHandler: ModelHandler = new ModelHandler(schema, 'modelName7');

				const created = await modelHandler.createMultiple([{name: 'Reece', age: 24}]);

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

});
