import type IPedido from "@models/pedido";
import type { CartProduto } from "@models/produto";

export type CreateOrderData = {
  orderData: CartOrderData;
  productsData: CartProduto[];
};

export type CartOrderData = Pick<
  IPedido,
  "troco_para" | "id_cupom" | "tipo_pagamento" | "tipo_entrega" | "id_usuario" | "id_endereco"
>;
