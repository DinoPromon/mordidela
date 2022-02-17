import orderErrors from "./pedido";
import orderProductErrors from "./pedido-produto";
import sessionsErrors from "./session";

import type { OrderErrors } from "./pedido";
import type { SessionErrors } from "./session";
import type { OrderProductErrors } from "./pedido-produto";

export type ServerError = {
  httpStatus: number;
  errorMessage: string;
};

type AllErrors = OrderErrors & OrderProductErrors & SessionErrors;

const allErrors = {
  ...orderErrors,
  ...orderProductErrors,
  ...sessionsErrors,
};

export function throwError(errorKey: keyof AllErrors): never {
  throw allErrors[errorKey];
}
