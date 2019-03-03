import * as chai from 'chai';
import { expect } from 'chai';
import { Schema } from 'mongoose';
import SchemaHandler  from './Schema';

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

			  	const schemaHandler = new SchemaHandler({ name: String });

		  		expect(schemaHandler.schema).to.be.instanceOf(Schema);

	        });

	    });

	});

});
