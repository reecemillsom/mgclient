import { expect } from "chai";
import { Schema } from "mongoose";
import { SchemaHandler, VirtualType } from "./Schema";

describe("SchemaHandler", () => {
  describe("when initialising", () => {
    describe("when a falsy definition is passed", () => {
      it("will return an error", () => {
        expect(() => new SchemaHandler(null)).to.throw(
          Error,
          "Invalid argument for definition parameter"
        );
      });
    });

    describe("when schema definition is not of type object", () => {
      it("will throw an error", () => {
        expect(() => new SchemaHandler([] as any, null)).to.throw(
          Error,
          "Invalid schema type, must be an object"
        );
      });
    });

    describe("when definition object is empty and has no keys", () => {
      it("will throw an error", () => {
        expect(() => new SchemaHandler({} as any)).to.throw(
          Error,
          "Invalid argument, definition object must contain contents"
        );
      });
    });

    describe("when we have a valid definition", () => {
      it("will return a schema", () => {
        const schemaHandler: SchemaHandler = new SchemaHandler({
          name: String,
        });

        expect(schemaHandler.schema).to.be.instanceOf(Schema);
      });
    });
  });

  describe("when asked to get schema", () => {
    it("will return the schema", () => {
      const schemaHandler: SchemaHandler = new SchemaHandler({ name: String });

      expect(schemaHandler.getSchema()).to.equal(schemaHandler.schema);
    });
  });

  describe("when asked to attach virtuals", () => {
    it("will take the inputted function reference and virtual name and create a virtual on the schema", () => {
      const schemaHandler: SchemaHandler = new SchemaHandler({
        name: String,
        age: Number,
      });

      const someFunc = function () {
        console.log("some func");
      };

      schemaHandler.attachVirtuals([
        {
          virtualFunction: someFunc,
          virtualName: "someFunc",
          virtualType: VirtualType.Set,
        },
      ]);

      const savedVirtual: any = schemaHandler.schema.virtual("someFunc");

      expect(savedVirtual.path).to.equal("someFunc");
      expect(savedVirtual.setters[0]).to.be.a("function");
    });

    describe("when asked to attach multiple virtuals", () => {
      it("will take the inputted functions and names and attach a virtual to the schema", () => {
        const schemaHandler: SchemaHandler = new SchemaHandler({
          name: String,
          age: Number,
        });

        const someFunc1 = function () {
          console.log("some func 1");
        };
        const someFunc2 = function () {
          console.log("some func 2");
        };

        schemaHandler.attachVirtuals([
          {
            virtualFunction: someFunc1,
            virtualName: "someFunc1",
            virtualType: VirtualType.Get,
          },
          {
            virtualFunction: someFunc2,
            virtualName: "someFunc2",
            virtualType: VirtualType.Get,
          },
        ]);

        const firstSavedVirtual: any =
          schemaHandler.schema.virtual("someFunc1");
        const secondSavedVirtual: any =
          schemaHandler.schema.virtual("someFunc2");

        expect(firstSavedVirtual.path).to.equal("someFunc1");
        expect(secondSavedVirtual.path).to.equal("someFunc2");
      });
    });
  });

  describe("when asked to attach instance methods", () => {
    it("will attach the methods that are defined", () => {
      const schemaHandler: SchemaHandler = new SchemaHandler({
        name: String,
        age: Number,
      });

      const someFunc1 = function () {
        console.log("some func 1");
      };
      const someFunc2 = function () {
        console.log("some func 2");
      };

      schemaHandler.attachMethods([
        {
          methodFunction: someFunc1,
          methodName: "someFunc1",
        },
        {
          methodFunction: someFunc2,
          methodName: "someFunc2",
        },
      ]);

      expect(schemaHandler.schema.methods.someFunc1).to.be.a("function");
      expect(schemaHandler.schema.methods.someFunc2).to.be.a("function");
    });
  });

  describe("when asked to attach statics", () => {
    it("will attach the static function to the schema", () => {
      const schemaHandler: SchemaHandler = new SchemaHandler({
        name: String,
        age: Number,
      });

      const someFunc1 = function () {
        console.log("some func 1");
      };

      const someFunc2 = function () {
        console.log("some func 2");
      };

      schemaHandler.attachStatics([
        {
          staticFunction: someFunc1,
          staticName: "someFunc1",
        },
        {
          staticFunction: someFunc2,
          staticName: "someFunc2",
        },
      ]);

      expect(schemaHandler.schema.statics.someFunc1).to.be.a("function");
      expect(schemaHandler.schema.statics.someFunc2).to.be.a("function");
    });
  });

  describe("when asked to attach query helpers", () => {
    it("will attach query helper function to the schema", () => {
      const schemaHandler: SchemaHandler = new SchemaHandler({
        name: String,
        age: Number,
      });

      const someFunc1 = function () {
        console.log("some func 1");
      };

      schemaHandler.attachQueryHelpers([
        { queryFunction: someFunc1, queryName: "someFunc1" },
      ]);

      expect((schemaHandler.schema.query as any).someFunc1).to.be.a("function");
    });
  });

  describe("when asked to attach compound indexes", () => {
    it("will run the through the array and attach the indexes appropriately", () => {
      const schemaHandler: SchemaHandler = new SchemaHandler({
        name: String,
        age: Number,
      });

      schemaHandler.attachCompoundIndexes([
        ["name", 1],
        ["age", -1],
      ]);

      expect(schemaHandler.schema.indexes()[0][0]).to.deep.equal({
        name: 1,
        age: -1,
      });
    });
  });

  describe("when asked to attach plugins", () => {
    it("will attach the plugins that are passed to the schema", () => {
      const schemaHandler: SchemaHandler = new SchemaHandler({
        name: String,
        age: Number,
      });

      const lastMod = function lastMod(schema, options) {
        schema.add({ lastMod: Date });

        schema.pre("save", function (next) {
          this.lastMod = new Date();
          next();
        });
      };

      expect(() => {
        schemaHandler.attachPlugins([{ plugin: lastMod, options: {} }]);
      }).to.not.throw();
    });
  });
});
