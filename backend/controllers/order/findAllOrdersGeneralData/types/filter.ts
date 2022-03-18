import type { StatusPedido } from "@models/pedido";

export type FiltersData = {
  status_pedido?: StatusPedido;
};

export type RawFiltersData = {
  [key in keyof FiltersData]: string | string[] | undefined;
};
