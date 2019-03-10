import {expect} from 'chai';
import {ModelHandler} from "./Model";
import {SchemaHandler} from "../Schema/Schema";

describe("ModelHandler", () => {

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

});
