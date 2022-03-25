import { StatusPedido } from "@models/pedido";

import type { OrderFilterParams } from "../types/orderFilter";

export enum FindDateFilter {
  TODAY = "TODAY",
  LAST_7_DAYS = "LAST_7_DAYS",
  LAST_30_DAYS = "LAST_30_DAYS",
  DATE = "DATE",
  NONE = "",
}

export const INIT_ORDER_FILTER: Readonly<OrderFilterParams> = {
  dateFilter: FindDateFilter.TODAY,
  skip: 0,
  date: undefined,
  orderStatus: StatusPedido.PENDENTE,
};
