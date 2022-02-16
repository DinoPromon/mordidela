import orderErrors from "./pedido";
import orderProductErrors from "./pedido-produto";

import type { OrderErrors } from "./pedido";
import type { OrderProductErrors } from "./pedido-produto";

export type ServerError = {
  httpStatus: number;
  errorMessage: string;
};

type AllErrors = OrderErrors & OrderProductErrors;

const allErrors = {
  ...orderErrors,
  ...orderProductErrors,
};

export function throwError(errorKey: keyof AllErrors): never {
  throw allErrors[errorKey];
}
