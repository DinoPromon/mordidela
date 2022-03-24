import * as Yup from "yup";

import { throwError } from "@errors/index";

import type { CreateFlavorArg } from "../types";

export class CreateFlavorValidator {
  private createArg: CreateFlavorArg;

  constructor(createArg: CreateFlavorArg) {
    this.createArg = createArg;
  }

  public validate() {
    const validationSchema = this.getValidationSchema();

    try {
      validationSchema.validateSync(this.createArg, { abortEarly: false });
    } catch (err) {
      const { errors } = err as Yup.ValidationError;
      console.error(errors);
      throwError("O-C-DI", { customMessage: errors.join(", ") });
    }
  }

  private getValidationSchema() {
    const validationSchema: Yup.SchemaOf<CreateFlavorArg> = Yup.object().shape({
      nome: Yup.string().required().typeError("Nome inválido"),
    });

    return validationSchema;
  }
}
