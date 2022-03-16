import * as Yup from "yup";

import { throwError } from "@errors/index";
import { PaginationHelperParser } from "./parser";

import type { PaginatedSearchArg, PaginationData } from "./types";

export class PaginationHelper extends PaginationHelperParser {
  private ITEMS_AMOUNT_DEFAULT = 12;
  private ITEMS_AMOUNT_MAX = 24;
  private SKIP_DEFAULT = 0;
  private paginationData: PaginationData;

  constructor(paginationData?: PaginatedSearchArg) {
    super(paginationData);
    this.paginationData = this.getParsedArg();
  }

  public getPaginationData() {
    this.validatePaginationData();

    return {
      itemsAmount: this.paginationData.itemsAmount || this.ITEMS_AMOUNT_DEFAULT,
      skip: this.paginationData.skip || this.SKIP_DEFAULT,
    } as PaginationData;
  }

  private getValidationSchema() {
    const validationSchema: Yup.SchemaOf<PaginationData> = Yup.object().shape({
      itemsAmount: Yup.number()
        .max(this.ITEMS_AMOUNT_MAX, "Permitido um máximo de 20 items por página")
        .notRequired(),
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
