import * as moment from 'moment';

export default function lastModifiedPlugin(schema) {
	schema.add({lastModified: Date});

	const attachLastModified = function (next) {
		this.lastModified = moment.utc().toDate();
		next();
	};

	const updateLastModified = function (document) {
		document.lastModified = moment.utc().toDate();

		document.save();
	};

	schema.pre('save', attachLastModified);
	schema.post('findOneAndUpdate', updateLastModified);
}
