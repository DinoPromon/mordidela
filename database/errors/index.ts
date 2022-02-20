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

type ThrowErrorOptions = {
  customMessage?: string;
};

const allErrors = {
  ...orderErrors,
  ...orderProductErrors,
  ...sessionsErrors,
};

export function throwError(errorKey: keyof AllErrors, options?: ThrowErrorOptions): never {
  const { errorMessage, httpStatus } = allErrors[errorKey];
  if (options) {
    if (options.customMessage) {
      const newServerError: ServerError = {
        httpStatus,
        errorMessage: `${errorMessage}: ${options.customMessage}`,
      };

      throw newServerError;
    }
  }
  throw allErrors[errorKey];
}
