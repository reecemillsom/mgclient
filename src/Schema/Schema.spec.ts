import {expect} from 'chai';
import {Schema} from 'mongoose';
import {SchemaHandler, Type} from './Schema';

describe("Schema", () => {

	describe("when initialising", () => {

		describe("when a falsy definition is passed", () => {

			it("will return an error", () => {

				expect(() =>
					new SchemaHandler(null)
				).to.throw(Error, 'Invalid argument for definition parameter');

			});

		});

		describe("when schema definition is not of type object", () => {

			it("will throw an error", () => {

				expect(() =>
					new SchemaHandler([] as any, null)
				).to.throw(Error, 'Invalid schema type, must be an object');

			});

		});

		describe("when definition object is empty and has no keys", () => {

			it("will throw an error", () => {

				expect(() =>
					new SchemaHandler({} as any)
				).to.throw(Error, 'Invalid argument, definition object must contain contents');

			});

		});

		describe("when we have a valid definition", () => {

			it("will return a schema", () => {

				const schemaHandler: SchemaHandler = new SchemaHandler({name: String});

				expect(schemaHandler.schema).to.be.instanceOf(Schema);

			});

		});

	});

	describe("when asked to attach virtuals", () => {

		it("will take the inputted function reference and virtual name and create a virtual on the schema", () => {

			const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

			const someFunc = function () {
				console.log('some func')
			};

			schemaHandler.attachVirtuals([{virtualFunction: someFunc, virtualName: 'someFunc', virtualType: Type.Set}]);

			const savedVirtual: any = schemaHandler.schema.virtual('someFunc');

			expect(savedVirtual.path).to.equal('someFunc');
			expect(savedVirtual.setters[0]).to.be.a('function');

		});

		describe("when asked to attach multiple virtuals", () => {

			it("will take the inputted functions and names and attach a virtual to the schema", () => {

				const schemaHandler: SchemaHandler = new SchemaHandler({name: String, age: Number});

				const someFunc1 = function () {
					console.log('some func 1')
				};
				const someFunc2 = function () {
					console.log('some func 2')
				};

				schemaHandler.attachVirtuals([{
					virtualFunction: someFunc1,
					virtualName: 'someFunc1',
					virtualType: Type.Get
				}, {
					virtualFunction: someFunc2,
					virtualName: 'someFunc2',
					virtualType: Type.Get
				}]);

				const firstSavedVirtual: any = schemaHandler.schema.virtual('someFunc1');
				const secondSavedVirtual: any = schemaHandler.schema.virtual('someFunc2');

				expect(firstSavedVirtual.path).to.equal('someFunc1');
				expect(secondSavedVirtual.path).to.equal('someFunc2');

			});

		});

	});

	//TODO do this after handling getting and setting of virtuals not just get.
	describe("when asked to attach instance methods", () => {


	});

});
