import type { StatusPedido } from "@models/pedido";

import type { FindDateFilter } from "../constants";

export type FiltersData = {
  status_pedido?: StatusPedido;
  filtro_data_pedido?: FindDateFilter;
  data_pedido?: string | Date;
};

export type RawFiltersData = {
  [key in keyof FiltersData]: string | string[] | undefined;
};
