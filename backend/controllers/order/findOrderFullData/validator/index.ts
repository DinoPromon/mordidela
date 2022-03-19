import * as Yup from "yup";

import { throwError } from "@errors/index";

import type { FindOrderFullDataArg } from "../types";

export class FindOrderFullDataValidtor {
  private findArg: FindOrderFullDataArg;

  constructor(findArg: FindOrderFullDataArg) {
    this.findArg = findArg;
  }

  public validate() {
    const validationSchema = this.getValidationSchema();

    try {
      validationSchema.validateSync(this.findArg, { abortEarly: false });
    } catch (err) {
      const { errors } = err as Yup.ValidationError;
      console.error(errors);
      throwError("O-C-DI", { customMessage: errors.join(", ") });
    }
  }

  private getValidationSchema() {
    const validationSchema: Yup.SchemaOf<FindOrderFullDataArg> = Yup.object().shape({
      id_pedido: Yup.number().typeError("Pedido inválido").required(),
    });

    return validationSchema;
  }
}
