import { Model } from "mongoose";

export type MiddlewareCallback = (this: Model<any>, ...args: any[]) => any;
