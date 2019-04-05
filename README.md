**Repository**

<https://github.com/reecemillsom/mongoose-client>


## Point to note

This project uses mongoose under the hood. The aim of this project is to provide an easy to use interface for people to create schemas and models in order to query collections easily.

## Installation

1. npm i mongoose-client.
2. import {
   	connectToDb,
   	disconnectFromDb,
   	dropCollection,
   	dropMultipleCollections,
   	dropDatabase,
   	SchemaHandler,
   	Type,
   	VirtualMethod,
   	InstanceMethod,
   	StaticMethod,
   	QueryMethod,
   	ModelHandler
   } from 'mongoose-client';
   
   
## Usage

### Schema creation

The main import you will need in order to create a schema.

    * SchemaHandler.
    
Creating a new SchemaHandler is easy and when doing so will do some error checks for you.

```
const schemaHandler = new Schema({name: String, age: Number});
```
    
There are multiple functions to use to help with attaching functions to the schema once the SchemaHandler has been initialised.

    * attachVirtuals.
    * attachMethods.
    * attachStatics.
    * attachQueryHandlers.
    * attachCompoundIndexes.
    
**attachVirtuals** - For attaching 1 or more virtuals at a time to the schema.

**Parameter: [{ virtualFunction: Function, virtualName: String, virtualType: 'get | 'set' }]** - The format that allows attaching of virtuals to the schema.

*virtualFunction* - Expected to be a reference to a function. Ensure this function doesn't use an arrow function. 

*virtualName* - The name of the field to be shown within the resulting document/s.

*virtualType* is 'get' - When querying for document/s you should see the virtual result from your virtualFunction become part of the document/s. The type get does not in any way persist to the collection.

*virtualType* is 'set' - When saving document/s you should see the result from the virtualFunction persist to the collection your saving to.

**attachMethods** - For attaching 1 or more methods at a time to the schema.

**Parameter: [{ methodFunction: Function, methodName: String }]** - The format for attaching methods to the schema.

*methodFunction* - Expected to be a reference to a function

*methodName* - The name of the method to call on the document.

**attachStatics** - For attaching 1 or more statics at a time to the schema.

### Utility functions
   
There are some utility functions that will allow you to easily connect to a database and also disconnect plus some other potentially helpful functions.
    
    * connectToDb.
    * disconnectFromDb.
    * dropCollection.
    * dropMultipleCollections.
    * dropDatabase.


**connectToDb** - For connecting to a database. If within an async function you can await the promise.

**Parameter: String** - The destination to connect to.
```
await connectToDb('mongodb://localhost:27017/test')
```

**disconnectFromDb** - For disconnecting from the database. When using this make sure this is the last function you call on the database otherwise errors will occur.

```
await disconnectFromDb();
```

**dropCollection** - For dropping a collection from the currently connected database. When used you will also lose all documents that were stored in the collection. 

**Parameter: String** - The name of the collection.

```
await dropCollection('users');
```

**dropMultipleCollections** - For dropping multiple collections rather than a single.

**Parameter: string[]** - The names of the collections you wish to drop.

```
await dropMultipleCollections(['products', 'users']);
```

**dropDatabase** - For dropping the database. Should only be used if really not needed anymore. You will lose all collections and any data.

```
await dropDatabase();
```
