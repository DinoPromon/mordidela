import * as Yup from "yup";

import { throwError } from "@errors/index";

import type { FindAllOrderRelationsByUserIdArg } from "../types";

export class FindAllOrderRelationsByUserIdValidator {
  private findAllArg: FindAllOrderRelationsByUserIdArg;

  constructor(findAllArg: FindAllOrderRelationsByUserIdArg) {
    this.findAllArg = findAllArg;
  }

  public validate() {
    try {
      const validationSchema = this.getValidationSchema();
      validationSchema.validateSync(this.findAllArg, { abortEarly: false });
    } catch (err) {
      const { errors } = err as Yup.ValidationError;
      console.error(err);
      throwError("O-C-DI", { customMessage: errors.join(", ") });
    }
  }

  private getValidationSchema() {
    const validationSchema: Yup.SchemaOf<FindAllOrderRelationsByUserIdArg> = Yup.object().shape({
      userId: Yup.number().required(),
    });

    return validationSchema;
  }
}
