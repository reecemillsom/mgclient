**Repository**

<https://github.com/reecemillsom/mgclient>

[![codecov](https://img.shields.io/travis/reecemillsom/mgclient.svg)](https://codecov.io/gh/reecemillsom/mgclient)
[![codecov](https://img.shields.io/codecov/c/github/reecemillsom/mgclient.svg)](https://codecov.io/gh/reecemillsom/mgclient)
[![codecov](https://img.shields.io/david/reecemillsom/mgclient.svg)](https://codecov.io/gh/reecemillsom/mgclient)



## Point to note

This project uses mongoose under the hood. The aim of this project is to provide an easy to use interface for people to create schemas and models in order to query collections easily.

## Installation

1. npm i mgclient.
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
   } from 'mgclient';
   
   
## Usage

### Schema creation

The main import you will need in order to create a schema.

    * SchemaHandler.
    
Creating a new SchemaHandler is easy and when doing so will do some error checks for you.

```
const schemaHandler = new SchemaHandler({name: String, age: Number});
```

As well as the schema definition you passed in, a deleted option will also be attached to the schema which will be a boolean and will have a default of false. This will mean later on when querying for documents, any documents that are 'deleted' will not be looked at or retrieved. This is good when you do not wish to hard delete from the collection sensitive data.
    
There are multiple functions to use to help with attaching functions to the schema once the SchemaHandler has been initialised.

    * attachVirtuals.
    * attachMethods.
    * attachStatics.
    * attachQueryHandlers.
    * attachCompoundIndexes.
    * attachPlugins.
    
**attachVirtuals** - For attaching 1 or more virtuals at a time to the schema.

**Parameter: [{ virtualFunction: Function, virtualName: String, virtualType: 'get | 'set' }]** - The format that allows attaching of virtuals to the schema.

*virtualFunction* - Expected to be a reference to a function. Ensure this function doesn't use an arrow function. 

*virtualName* - The name of the field to be shown within the resulting document/s.

*virtualType* is 'get' - When querying for document/s you should see the virtual result from your virtualFunction become part of the document/s. The type get does not in any way persist to the collection.

*virtualType* is 'set' - When saving document/s you should see the result from the virtualFunction persist to the collection your saving to.

**attachMethods** - For attaching 1 or more methods at a time to the schema.

**Parameter: [{ methodFunction: Function, methodName: String }]** - The format for attaching methods to the schema. Ensure this doesn't use an arrow function.

*methodFunction* - Expected to be a reference to a function

*methodName* - The name of the method to call on the document.

**attachStatics** - For attaching 1 or more statics at a time to the schema.

**Parameter: [{ staticFunction: Function, staticName: String }]** - The format that allows attaching of statics to the schema.

*staticFunction* - Expected to be a reference to a function. Ensure this is not an arrow function.

*staticName* - The name of the static function that can be called on the model.

**attachQueryHelpers** - For attaching query helpers to the schema.

**Parameter: [{ queryFunction: Function, queryName: String }]** - The format that allows attaching of queryHelpers to the schema.

*queryFunction* - Expected to be a reference to a function. Ensure this is not an arrow function.

*queryName* - The name of the query helper to be called. This can be chained with other mongoose model methods. E.g. find().

**attachingCompoundIndexes** - For attaching indexes which are not at the field level.

**Parameter: [[nameOfField: string, sortingOrder: number]]** - Format of an array of arrays. This is to keep good format of the field name and the sorting order.

**attachPlugins** - For attaching plugins to the schema, in order to do things on save, update or whatever your needs are.

**Parameter: [{ plugin: (schema, options) => void, options?: object}]** - Format of an array of plugins. plugin must be a reference to a function and options are optional to pass to the plugin. 

### Model creation

The main import you will need in order to create a schema.

    * ModelHandler.
    
To create a model you will need the schema you just created. When you have finished attaching your virtuals and other functions to your schema call ```getSchema()``` on the schemaHandler.

Once you have the schema you are ready to pass this into the modelHandler.
    
Creating a new ModelHandler is easy.

```
const modelHandler = new ModelHandler(schema: Schema, modelName: String);
```

To help query the model that you create, I have attached a few methods to the ModelHandler that you can make use of.

    * createOne.
    * createMany.
    * findById.
    * findMany.
    * updateOne.
    * updateMany.
    * deleteOne.
    * deleteMany.
    * paginate.
    
**createOne** - This is used to create a single document in a collection.

**Parameters:**

*document: object* - The shape of the document you wish to stop in the collection.

*options?: object* - Options that will be accepted by a mongoose ```create()```.
    
**createMany** - This is used to create many documents in a collection.

**Parameters:**

*documents: any[]* - The shape of the documents that you wish to store in your collection.

*options?: object* - Options that will be accepted by a mongoose ```create()```.

**findById:** - For finding a document by _id

**Parameters:**

*id: ObjectId* - The objectId of the document that you wish to find.

*projection?: object* - The projection to limit the number of rows coming back in the document.

*options?: object* - Options that will be accepted by a mongoose ```findById()```.

**findMany** - For finding many documents that match the criteria provided.

**Parameters:**

*filter: object* - The filter to find documents based on.

*projection?: object* - The projection to limit the number of rows coming back in the document.

*options?: object* - Options that will be accepted by a mongoose ```find()```.

**updateOne** - Update a single document based on the filter passed in.

**Parameters:**

*filter: object* - The filter to find the document you wish to be updated.

*updatedFields: object* - The fields and there corresponding values you wish to update to.

*options?: object* - Options that will be accepted by a mongoose ```findOneAndUpdate()```.

**updateMany** - Update multiple documents that match the filter criteria.

**Parameters:**

*filter: object* - The filter to match against in order to update the corresponding documents.

*updatedFields: object* - The fields and there corresponding values you wish to update to.

*options?: object* - Options that will be accepted by a mongoose ```updateMany()```.

**deleteOne** - This should set a deleted flag on a single document from the collection.

**Parameters:**

*filter: object* - The filter to match against in order to delete document from the collection.

*options?: object* - Options that will be accepted by a mongoose ```findOneAndUpdate()```.

**deleteMany** - This should set a deleted flag on many documents from the collection.

**Parameters:**

*filter: object* - The filter to match against in order to delete the corresponding documents.

*options?: object* - Options that will be accepted by a mongoose ```updateMany()```.

**paginate** - This allows for limiting down the number of responses from the database into batches.

**Parameters:**

*pageInformation: Page = { page: number, pageSize: number }* - So we know when to start paginating from and how many results to send back.

*filter: object* - The filter to match against in order to get results. If falsy value is passed will default to empty object.

*startId?: ObjectId* - Providing a startId allows for more efficient pagination. This allows for quicker ranges to be found and does so by the _.id field which is indexed by default.

*isAscendingSort?: boolean* - Determines whether to show the most recent documents first or least. If ascending then least recent documents first otherwise most recent.


If you do not wish to use the corresponding functions above or need some different functionality, you can still get the model and call the corresponding mongoose functions or you can extend the class and add your more specific queries.

```
const model = modelHandler.getModel();
```

**Extending model handler**

If there are queries that you wish to do but do not get provided out of the box you can extend the model handler and add your functions to the class. You will have access to the model from the parent and the baseQuery which I recommend you use to keep in line with the functions that are already given.

```
export default class TestClass extends ModelHandler {

    async testFunc() {
       ...someLogic
    }

}
```

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
