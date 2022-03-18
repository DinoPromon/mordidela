import { StatusPedido } from "@models/pedido";

import type { RawFiltersData, FiltersData } from "../types/filter";

export class FindAllOrderGeneralDataParser {
  private rawFiltersData: RawFiltersData;

  constructor(rawFiltersData: RawFiltersData) {
    this.rawFiltersData = rawFiltersData;
  }

  private parseOrderStatus(rawOrderStatus?: string | string[]) {
    if (!rawOrderStatus) return undefined;

    const orderStatus = rawOrderStatus as StatusPedido;

    const possibleValues: StatusPedido[] = [
      StatusPedido.CONFIRMADO,
      StatusPedido.PENDENTE,
      StatusPedido.REJEITADO,
    ];

    const isValid = possibleValues.indexOf(orderStatus) > -1;

    return isValid ? orderStatus : undefined;
  }

  public parse() {
    const parsedFiltersData: FiltersData = {
      status_pedido: this.parseOrderStatus(this.rawFiltersData.status_pedido),
    };

    return parsedFiltersData;
  }
}
