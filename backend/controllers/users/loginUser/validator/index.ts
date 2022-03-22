import * as Yup from "yup";

import { throwError } from "@errors/index";

import type { LoginUserArg } from "../types";

export class LoginUserValidator {
  private loginArg: LoginUserArg;

  constructor(loginArg: LoginUserArg) {
    this.loginArg = loginArg;
  }

  public validate() {
    const validationSchema = this.getValidationSchema();

    try {
      validationSchema.validateSync(this.loginArg, { abortEarly: false });
    } catch (err) {
      const { errors } = err as Yup.ValidationError;
      console.error(errors);
      throwError("O-C-DI", { customMessage: errors.join(", ") });
    }
  }

  private getValidationSchema() {
    const validationSchema: Yup.SchemaOf<LoginUserArg> = Yup.object().shape({
      email: Yup.string().required("Email necessário para realização de login"),
      senha: Yup.string().required("Senha necessária para realização de login"),
    });

    return validationSchema;
  }
}
