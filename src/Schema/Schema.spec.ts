import * as chai from 'chai';
import { expect } from 'chai';
import { Schema } from 'mongoose';
import { getSchema } from './Schema';

describe("Schema", () => {

    describe("when asked to get schema", () => {

        describe("when a document isn't passed it will throw an error", () => {

			it("will throw an error", () => {

				expect(() =>
					getSchema(null, null)
				).to.throw(Error, 'Invalid argument for document parameter');

			});

        });

        describe("when document object is empty and has no keys", () => {

            it("will throw an error", () => {

                expect(() =>
					getSchema({} as any, null)
				).to.throw(Error, 'Invalid argument, document object must contain contents');

            });

        });

        describe("when document is defined and schema name is empty", () => {

            it("will throw an error", () => {

			  expect(() =>
				  getSchema({ name: String }, '')
			  ).to.throw(Error, 'Invalid schema name, this is needed for creating a schema');

            });

        });

    });

});
