import { connectToDb } from "../../src/Utils/ConnectToDb";
import { disconnectFromDb } from "../../src/Utils/DisconnectFromDb";
import { dropDatabase } from "../../src/Utils/DropDatabase";
import { dropMultipleCollections } from "../../src/Utils/DropCollection";
import { ModelHandler } from "../../src/Model/Model";
import { SchemaHandler } from "../../src/Schema/Schema";

(async () => {
  await connectToDb("mongodb://localhost:27017/test");

  const userSchema = new SchemaHandler({ name: String, age: Number });
  const productSchema = new SchemaHandler({
    stockLevel: Number,
    price: Number,
  });

  const user = userSchema.getSchema();
  const product = productSchema.getSchema();

  const userModelHandler = new ModelHandler(user, "User");

  await userModelHandler.createMany([{ name: "Steve", age: 24 }]);

  const productModelHandler = new ModelHandler(product, "Product");

  await productModelHandler.createMany([{ stockLevel: 5, price: 10 }]);

  // await dropCollection('users'); //This does work also, just testing dropping multiple same time below.

  await dropMultipleCollections(["products", "users"]);

  await dropDatabase();

  await disconnectFromDb();
})();
