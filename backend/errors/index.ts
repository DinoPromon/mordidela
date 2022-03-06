import orderErrors from "./pedido";
import productErrors from "./produto";
import addressErrors from "./endereco";
import sessionsErrors from "./session";
import orderProductErrors from "./pedido-produto";

import type { OrderErrors } from "./pedido";
import type { ProductErrors } from "./produto";
import type { SessionErrors } from "./session";
import type { AddressErrors } from "./endereco";
import type { OrderProductErrors } from "./pedido-produto";

export type ServerError = {
  httpStatus: number;
  errorMessage: string;
};

type AllErrors = OrderErrors & OrderProductErrors & SessionErrors & ProductErrors & AddressErrors;

type ThrowErrorOptions = {
  customMessage?: string;
};

const allErrors: AllErrors = {
  ...orderErrors,
  ...orderProductErrors,
  ...sessionsErrors,
  ...productErrors,
  ...addressErrors,
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
