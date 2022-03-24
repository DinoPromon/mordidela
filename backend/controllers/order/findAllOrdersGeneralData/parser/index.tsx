import { StatusPedido } from "@models/pedido";

import { createDate } from "@utils/transformation/date";
import { FindDateFilter } from "../constants";

import type { RawFiltersData, FiltersData } from "../types/filter";

export class FindAllOrderGeneralDataParser {
  private rawFiltersData: RawFiltersData;

  constructor(rawFiltersData: RawFiltersData) {
    this.rawFiltersData = rawFiltersData;
  }

  private parseOrderDate(rawOrderDate?: string | string[]) {
    if (!rawOrderDate || Array.isArray(rawOrderDate)) return undefined;

    const orderDate = createDate(rawOrderDate);

    if (isNaN(orderDate.getDate())) return undefined;

    return orderDate;
  }

  private parseOrderDateFilter(rawOrderDate?: string | string[]) {
    if (!rawOrderDate || Array.isArray(rawOrderDate)) return undefined;

    const orderDateFitler = rawOrderDate as FindDateFilter;

    const possibleValues: FindDateFilter[] = [
      FindDateFilter.DATE,
      FindDateFilter.LAST_30_DAYS,
      FindDateFilter.LAST_7_DAYS,
      FindDateFilter.TODAY,
      FindDateFilter.NONE,
    ];

    return possibleValues.indexOf(orderDateFitler) > -1 ? orderDateFitler : undefined;
  }

  private parseOrderStatus(rawOrderStatus?: string | string[]) {
    if (!rawOrderStatus) return undefined;

    const orderStatus = rawOrderStatus as StatusPedido;

    const possibleValues: StatusPedido[] = [
      StatusPedido.CONFIRMADO,
      StatusPedido.PENDENTE,
      StatusPedido.REJEITADO,
    ];

    return possibleValues.indexOf(orderStatus) > -1 ? orderStatus : undefined;
  }

  public parse() {
    const parsedFiltersData: FiltersData = {
      status_pedido: this.parseOrderStatus(this.rawFiltersData.status_pedido),
      data_pedido: this.parseOrderDate(this.rawFiltersData.data_pedido),
      filtro_data_pedido: this.parseOrderDateFilter(this.rawFiltersData.filtro_data_pedido),
    };

    return parsedFiltersData;
  }
}
