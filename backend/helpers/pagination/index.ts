import * as Yup from "yup";

import { throwError } from "@errors/index";
import { PaginationHelperParser } from "./parser";

import type { PaginatedSearchArg, PaginationData } from "./types";

export class PaginationHelper extends PaginationHelperParser {
  private paginationData: PaginationData;

  constructor(paginationData: PaginatedSearchArg) {
    super(paginationData);
    this.paginationData = this.getParsedArg();
  }

  public getPaginationData() {
    this.validatePaginationData();

    return this.paginationData;
  }

  private getValidationSchema() {
    const validationSchema: Yup.SchemaOf<PaginationData> = Yup.object().shape({
      itemsAmount: Yup.number().max(20, "Permitido um máximo de 20 items por página").notRequired(),
      skip: Yup.number().notRequired(),
    });

    return validationSchema;
  }

  private validatePaginationData() {
    try {
      const validationSchema = this.getValidationSchema();

      validationSchema.validateSync(this.paginationData, { abortEarly: false });
    } catch (err) {
      console.error(err);
      const { errors } = err as Yup.ValidationError;
      throwError("O-C-DI", { customMessage: errors.join(", ") });
    }
  }
}
