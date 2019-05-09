/*Util functions*/
import {connectToDb} from "./src/Utils/ConnectToDb";
import {disconnectFromDb} from "./src/Utils/DisconnectFromDb";
import {dropCollection, dropMultipleCollections} from "./src/Utils/DropCollection";
import {dropDatabase} from "./src/Utils/DropDatabase";

/*Schema and Model*/
import {SchemaHandler} from "./src/Schema/Schema";
import {Type, VirtualMethod, InstanceMethod, StaticMethod, QueryMethod} from "./src/Schema/Schema";
import {ModelHandler} from "./src/Model/Model";

/*Plugins*/
import lastModified from "./src/Plugins/LastModified/LastModified";


export {
	connectToDb,
	disconnectFromDb,
	dropCollection,
	dropMultipleCollections,
	dropDatabase,
	lastModified,
	SchemaHandler,
	Type,
	VirtualMethod,
	InstanceMethod,
	StaticMethod,
	QueryMethod,
	ModelHandler,
}
