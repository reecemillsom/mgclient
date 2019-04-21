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
const schemaHandler = new SchemaHandler({name: String, age: Number});
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

**Parameter: [{ staticFunction: Function, staticName: String }]** - The format that allows attaching of statics to the schema.

*staticFunction* - Expected to be a reference to a function. Ensure this is not an arrow function.

*staticName* - The name of the static function that can be called on the model.

**attachQueryHelpers** - For attaching query helpers to the schema.

**Parameter: [{ queryFunction: Function, queryName: String }]** - The format that allows attaching of queryHelpers to the schema.

*queryFunction* - Expected to be a reference to a function. Ensure this is not an arrow function.

*queryName* - The name of the query helper to be called. This can be chained with other mongoose model methods. E.g. find().

**attachingCompoundIndexes** - For attaching indexes which are not at the field level.

**Parameter: [[nameOfField: string, sortingOrder: number]]** - Format of an array of arrays. This is to keep good format of the field name and the sorting order.

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

    * createMany.
    * findById.
    * findMany.
    * updateOne.
    * updateMany.
    * deleteOne.
    * deleteMany.
    
**createMany** - Although the name states many, this can be used to create 1 or more documents in the corresponding collection.

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

**deleteOne** - This should be set a deleted flag on a single document from the collection.

**Parameters:**

*filter: object* - The filter to match against in order to delete document from the collection.

*options?: object* - Options that will be accepted by a mongoose ```findOneAndUpdate()```.

**deleteMany** - This should set a deleted flag on many documents from the collection.

**Parameters:**

*filter: object* - The filter to match against in order to delete the corresponding documents.

*options?: object* - Options that will be accepted by a mongoose ```updateMany()```.

If you do not wish to use the corresponding functions above or need some different functionality, you can still get the model and call the corresponding mongoose functions or you can extend the class and add your more specific queries.

```
cosnt model = modelHandler.getModel();
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
