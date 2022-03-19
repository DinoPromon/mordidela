import type IPedido from "@models/pedido";

export type UpdateOrderStatusArg = {
  status_pedido: string;
  id_pedido: IPedido["id_pedido"];
};
