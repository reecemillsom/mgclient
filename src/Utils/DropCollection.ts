import {connection} from "mongoose";

export const dropCollection = async (collectionName: string): Promise<boolean> => {
	return await connection.db.dropCollection(collectionName);
};

export const dropMultipleCollections = async (collectionNames: string[]): Promise<boolean[]> => {
	const dropCollections = collectionNames.map(collectionName => {
		return connection.db.dropCollection(collectionName);
	});

	return await Promise.all(dropCollections);
};

