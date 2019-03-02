import * as chai from 'chai';
import { expect } from 'chai';
import { Schema } from 'mongoose';
import { getSchema } from './Schema';

describe("Schema", () => {

    describe("when asked to get schema", () => {

        describe("when definition isn't passed it will throw an error", () => {

			it("will throw an error", () => {

				expect(() =>
					getSchema(null, null)
				).to.throw(Error, 'Invalid argument for document parameter');

			});

        });

        describe("when schema definition is not of type object	", () => {

            it("will throw an error", () => {

                expect(() =>
					getSchema([] as any, null)
				).to.throw(Error, 'Invalid schema type, must be an object');

            });

        });

        describe("when definition object is empty and has no keys", () => {

            it("will throw an error", () => {

                expect(() =>
					getSchema({} as any, null)
				).to.throw(Error, 'Invalid argument, document object must contain contents');

            });

        });

        describe("when we have a valid definition", () => {

            it("will return schema", () => {

                const result = getSchema({ name: String });

                expect(result).to.be.instanceOf(Schema);

            });

        });

    });

});
