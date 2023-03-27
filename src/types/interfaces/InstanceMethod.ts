import { MiddlewareCallback } from "../custom/MiddlewareCallback";

export interface InstanceMethod {
  methodFunction: MiddlewareCallback;
  methodName: string;
}
