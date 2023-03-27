import { VirtualType } from "../../src/types/enums";
import { SchemaHandler } from "../../src/Schema/Schema";

const schemaHandler = new SchemaHandler({ name: String, age: Number });

console.log("schemaHandler>", schemaHandler);

const virtualMethod = () => {
  // @ts-ignore
  this.nameAngAge = "foo" + "bar";
};

function instanceMethod() {
  console.log("foo>");
}

function staticMethod() {
  console.log("bar>");
}

function queryMethod() {
  console.log("baz>");
}

schemaHandler.attachVirtuals([
  {
    virtualFunction: virtualMethod,
    virtualType: VirtualType.Get,
    virtualName: "nameAndAge",
  },
]);
schemaHandler.attachMethods([
  { methodFunction: instanceMethod, methodName: "instanceMethod" },
]);
schemaHandler.attachStatics([
  { staticFunction: staticMethod, staticName: "staticMethod" },
]);
schemaHandler.attachQueryHelpers([
  { queryFunction: queryMethod, queryName: "queryMethod" },
]);

const schemaDefinition = schemaHandler.getSchema();

console.log("schemaDefinition>", schemaDefinition);
