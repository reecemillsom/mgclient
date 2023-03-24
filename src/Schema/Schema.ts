import { Schema, SchemaDefinition, SchemaOptions } from "mongoose";
import { forEach, fromPairs } from "lodash";

export enum VirtualType {
  Get = "get",
  Set = "set",
}

export interface VirtualMethod {
  virtualFunction: Function;
  virtualName: string;
  virtualType: VirtualType;
}

export interface InstanceMethod {
  methodFunction: Function;
  methodName: string;
}

export interface StaticMethod {
  staticFunction: Function;
  staticName: string;
}

export interface QueryMethod {
  queryFunction: Function;
  queryName: string;
}

export interface PluginMethod {
  plugin: (schema: Schema, options: object) => void;
  options?: object;
}

export class SchemaHandler {
  readonly schema: Schema;

  constructor(definition: SchemaDefinition, schemaOptions?: SchemaOptions) {
    this.schema = this.handleSchemaInitialisation(definition, schemaOptions);
  }

  public getSchema(): Schema {
    return this.schema;
  }

  public attachVirtuals(virtuals: VirtualMethod[]) {
    forEach(virtuals, (virtual) => {
      this.schema
        .virtual(virtual.virtualName)
        [virtual.virtualType](virtual.virtualFunction);
    });
  }

  public attachMethods(methods: InstanceMethod[]) {
    forEach(methods, (method) => {
      this.schema.methods[method.methodName] = method.methodFunction;
    });
  }

  public attachStatics(statics: StaticMethod[]) {
    forEach(statics, (stat) => {
      this.schema.statics[stat.staticName] = stat.staticFunction;
    });
  }

  public attachQueryHelpers(querys: QueryMethod[]) {
    forEach(querys, (query) => {
      this.schema.query[query.queryName] = query.queryFunction;
    });
  }

  public attachCompoundIndexes(indexes: Array<[string, number]>, options?) {
    const formattedIndexes = fromPairs(indexes);

    this.schema.index(formattedIndexes, options);
  }

  public attachPlugins(plugins: PluginMethod[]) {
    forEach(plugins, (plugin: PluginMethod) => {
      this.schema.plugin(plugin.plugin, plugin.options || {});
    });
  }

  private handleSchemaInitialisation(
    definition: SchemaDefinition,
    schemaOptions?: SchemaOptions
  ): Schema {
    this.handleErrorCases(definition);

    const schema = {
      deleted: {
        type: Boolean,
        default: false,
      },
      ...definition,
    };

    return new Schema(schema, schemaOptions);
  }

  private handleErrorCases(definition: SchemaDefinition) {
    if (!definition) {
      throw new Error("Invalid argument for definition parameter");
    }

    if (Array.isArray(definition) || typeof definition !== "object") {
      throw new Error("Invalid schema type, must be an object");
    }

    if (Object.keys(definition).length === 0) {
      throw new Error(
        "Invalid argument, definition object must contain contents"
      );
    }
  }
}
