import { Schema } from "mongoose";
export interface PluginMethod {
  plugin: (schema: Schema, options: object) => void;
  options?: object;
}
