import * as Yup from "yup";
import { StatusPedido } from "@models/pedido";
import { throwError } from "@errors/index";

import { FindDateFilter } from "../constants";

import type { FiltersData } from "../types/filter";

export class FindAllOrderGeneralDataValidator {
  private filterData: FiltersData;

  constructor(filterData: FiltersData) {
    this.filterData = filterData;
  }

  public validate() {
    const validationSchema = this.getValidationSchema();

    try {
      validationSchema.validateSync(this.filterData, { abortEarly: false });
    } catch (err) {
      const { errors } = err as Yup.ValidationError;
      throwError("O-C-DI", { customMessage: errors.join(",") });
    }
  }

  private getValidationSchema() {
    const validationSchema: Yup.SchemaOf<FiltersData> = Yup.object().shape({
      status_pedido: Yup.mixed().oneOf(Object.values(StatusPedido)),
      filtro_data_pedido: Yup.mixed().oneOf(Object.values(FindDateFilter)),
      data_pedido: Yup.date()
        .notRequired()
        .when("filtro_data_pedido", {
          is: (value?: FindDateFilter) => value === FindDateFilter.DATE,
          then: Yup.date().required(),
          otherwise: Yup.date().notRequired(),
        }),
    });

    return validationSchema;
  }
}
