import { MiddlewareCallback } from "../custom/MiddlewareCallback";

export interface QueryMethod {
  queryFunction: MiddlewareCallback;
  queryName: string;
}
