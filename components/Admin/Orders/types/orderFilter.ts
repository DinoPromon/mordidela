import type { FindDateFilter } from "../constants";
import type { StatusPedido } from "@models/pedido";

export type OrderFilterParams = {
  skip: number;
  orderStatus?: StatusPedido;
  dateFilter: FindDateFilter;
  date?: string;
};
