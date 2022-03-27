import * as Yup from "yup";

import { throwError } from "@errors/index";

import type { CreateAdditionalsArg } from "../types";

export class CreateAdditionalValidator {
  private createArg: CreateAdditionalsArg;

  constructor(createArg: CreateAdditionalsArg) {
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
    const validationSchema: Yup.SchemaOf<CreateAdditionalsArg> = Yup.object().shape({
      nome: Yup.string().required("Nome inválido").typeError("Nome inválido"),
      preco: Yup.number().required("Preço inválido").typeError("Preço inválido"),
    });

    return validationSchema;
  }
}
