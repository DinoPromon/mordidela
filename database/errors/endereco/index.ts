import type { ServerError } from "../index";

export type AddressErrors = {
  "A-C": ServerError;
  "A-C-DI": ServerError;
  "A-FA": ServerError;
};

const addressErrors: AddressErrors = {
  "A-C": {
    httpStatus: 500,
    errorMessage: "Erro na criação de endereço",
  },
  "A-C-DI": {
    httpStatus: 422,
    errorMessage: "Dado(s) de endereço inválido(s)",
  },
  "A-FA": {
    httpStatus: 500,
    errorMessage: "Erro ao procurar os endereços",
  },
};

export default addressErrors;
