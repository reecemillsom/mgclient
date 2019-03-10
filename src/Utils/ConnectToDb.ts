import {connect} from "mongoose";

export interface ConnectionOptions {
	user?: string;
	pass?: string;
	autoIndex?: boolean;
	dbName?: string;
}

export const connectToDB = async (connectionString: string, options?: ConnectionOptions) => {
	await connect(connectionString, options);
};


