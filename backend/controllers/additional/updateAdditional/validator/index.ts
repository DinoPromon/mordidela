import { throwError } from "@errors/index";
import * as Yup from "yup";

import type { UpdateAdditionalArg } from "../types";

export class UpdateAdditionalValidator {
  private updateArg: UpdateAdditionalArg;

  constructor(updateArg: UpdateAdditionalArg) {
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
    const validationSchema: Yup.SchemaOf<UpdateAdditionalArg> = Yup.object().shape({
      nome: Yup.string().notRequired().typeError("Nome inválido"),
      deletado: Yup.boolean().notRequired().typeError("Exclusão inválida"),
      id_adicional: Yup.number().required(),
      preco: Yup.number().notRequired().typeError("Preço inválido"),
    });

    return validationSchema;
  }
}
