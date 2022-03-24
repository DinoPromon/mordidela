import { throwError } from "@errors/index";
import * as Yup from "yup";

import type { UpdateFlavorArg } from "../types";

export class UpdateFlavorValidator {
  private updateArg: UpdateFlavorArg;

  constructor(updateArg: UpdateFlavorArg) {
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
    const validationSchema: Yup.SchemaOf<UpdateFlavorArg> = Yup.object().shape({
      nome: Yup.string().notRequired().typeError("Nome inválido"),
      deletado: Yup.boolean().notRequired().typeError("Exclusão inválida"),
      id_sabor: Yup.number().required(),
    });

    return validationSchema;
  }
}
