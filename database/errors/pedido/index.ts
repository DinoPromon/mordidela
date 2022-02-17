import type { ServerError } from "../index";

export type OrderErrors = {
  "O-C": ServerError;
  "O-FA": ServerError;
  "O-CT-UID": ServerError;
  "O-CT-CID": ServerError;
  "O-C-DI": ServerError;
};

const orderErrors: OrderErrors = {
  "O-C": {
    httpStatus: 500,
    errorMessage: "Erro na criação do pedido",
  },
  "O-FA": {
    httpStatus: 500,
    errorMessage: "Erro na busca de pedidos",
  },
  "O-CT-UID": {
    httpStatus: 500,
    errorMessage: "Erro na contagem de pedidos",
  },
  "O-CT-CID": {
    httpStatus: 500,
    errorMessage: "Erro na contagem de pedidos",
  },
  "O-C-DI": {
    httpStatus: 422,
    errorMessage: "Dados de requisição inválidos"
  }
};

export default orderErrors;
