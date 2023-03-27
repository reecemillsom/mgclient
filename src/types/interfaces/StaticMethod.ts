import { MiddlewareCallback } from "../custom/MiddlewareCallback";

export interface StaticMethod {
  staticFunction: MiddlewareCallback;
  staticName: string;
}
