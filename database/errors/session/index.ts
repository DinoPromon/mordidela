import type { ServerError } from "../index";

export type SessionErrors = {
  "S-NL": ServerError;
  "S-NP": ServerError;
  "S-UNA": ServerError;
};

const sessionsErrors: SessionErrors = {
  "S-NL": {
    httpStatus: 401,
    errorMessage: "É necessário autenticação para acessar essa rota",
  },
  "S-NP": {
    httpStatus: 403,
    errorMessage: "O usuário não possuir permissão para essa rota",
  },
  "S-UNA": {
    httpStatus: 403,
    errorMessage: "Usário não autorizado",
  },
};

export default sessionsErrors;
