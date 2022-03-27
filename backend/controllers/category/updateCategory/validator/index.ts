import * as Yup from "yup";

import { throwError } from "@errors/index";

import type { UpdateCategoryArg } from "../types";

export class UpdateCategoryValidator {
  private updateArg: UpdateCategoryArg;

  constructor(updateArg: UpdateCategoryArg) {
    this.updateArg = updateArg;
  }

  public validate() {
    const validationSchema = this.getValidationSchema();
    try {
      validationSchema.validateSync(this.updateArg, { abortEarly: false });
    } catch (err) {
      const { errors } = err as Yup.ValidationError;
      console.error(errors);
      throwError("O-C-DI", { customMessage: errors.join(", ") });
    }
  }

  private getValidationSchema() {
    const validationSchema: Yup.SchemaOf<UpdateCategoryArg> = Yup.object().shape({
      nome: Yup.string().notRequired().typeError("Nome inválido"),
      deletado: Yup.boolean().notRequired().typeError("Exclusão inválida"),
      id_categoria: Yup.number().required(),
      id_desconto: Yup.number().notRequired().typeError("Desconto inválido"),
    });

    return validationSchema;
  }
}
