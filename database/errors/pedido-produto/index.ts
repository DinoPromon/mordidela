import type { ServerError } from "../index";

export type OrderProductErrors = {
  "OP-C": ServerError;
};

const orderProductErrors: OrderProductErrors = {
  "OP-C": {
    httpStatus: 500,
    errorMessage: "Erro na criação de pedido_produto",
  },
};

export default orderProductErrors;
