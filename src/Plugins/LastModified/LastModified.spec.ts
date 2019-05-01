import lastModified from './LastModified';
import {SchemaHandler} from "../../Schema/Schema";
import {ModelHandler} from "../../Model/Model";
import {connectToDb} from "../../Utils/ConnectToDb";
import {disconnectFromDb} from "../../Utils/DisconnectFromDb";
import {dropDatabase} from "../../Utils/DropDatabase";

import * as moment from 'moment';

import {expect} from 'chai';

describe("when asked to attach last modified plugin", () => {

	let schemaHandler: SchemaHandler;
	let modelHandler: ModelHandler;

	before(async () => {

		await connectToDb('mongodb://localhost:27017/test');

		schemaHandler = new SchemaHandler({name: String, age: Number});

		schemaHandler.attachPlugins([{plugin: lastModified}]);

		modelHandler = new ModelHandler(schemaHandler.getSchema(), 'User');

	});

	after(async () => {

		await dropDatabase();

		await disconnectFromDb();

	});

	describe("when a document is created", () => {

		it("will attach a last modified date to the document", async () => {

			const personDocument = await modelHandler.createMany([{
				name: 'Rhianna',
				age: '15'
			}]);

			const foundPerson = await modelHandler.findById(personDocument[0]._id);

			expect(foundPerson.lastModified).to.satisfy((date) => {
				return date instanceof Date;
			});

		});

	});

	describe("when a document is updated", () => {

		it("will update the original date on the document to the new one", async () => {
			const personDocument = await modelHandler.createMany([{
				name: 'Reece',
				age: 24
			}]);

			const firstTime = personDocument[0].lastModified;

			const updatedPerson = await modelHandler.updateOne({
				_id: personDocument[0]._id
			}, {
				age: 25
			});

			const secondTime = updatedPerson.lastModified;

			expect(moment(firstTime).format('YYYY/MM/DD HH:mm:ss:SSS')).to.not.equal(moment(secondTime).format('YYYY/MM/DD HH:mm:ss:SSS'));

		});

	});

});
