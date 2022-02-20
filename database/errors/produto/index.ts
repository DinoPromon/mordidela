import type { ServerError } from "../index";

export type ProductErrors = {
  "P-C": ServerError;
};

const productErrors: ProductErrors = {
  "P-C": {
    httpStatus: 500,
    errorMessage: "Erro na criação de produto",
  },
};

export default productErrors;
