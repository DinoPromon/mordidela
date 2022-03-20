import type IPedido from "@models/pedido";
import type IProduto from "@models/produto";

import { OrderProductFlavorRelation } from "./types";

export function getProductLabel(product: IProduto) {
  if (product.tamanho) {
    return `${product.nome} - ${product.tamanho}`;
  }

  return product.nome;
}

export function getStringFlavorsInOrderProduct(
  orderProductFlavors: OrderProductFlavorRelation[],
  orderId: IPedido["id_pedido"],
  productId: IProduto["id_produto"]
) {
  const filteredOrderProductFlavors = orderProductFlavors.filter(
    ({ id_pedido, id_produto }) => id_pedido === orderId && id_produto === productId
  );

  const flavorsNameInOrderProduct = filteredOrderProductFlavors.map(
    (orderProductFlavor) => orderProductFlavor.sabor?.nome as string
  );

  return flavorsNameInOrderProduct.join(", ");
}

export { calculateCouponDiscount } from "./coupon";
export { getAddsInOrderProduct, calculateAddsTotalPrice } from "./add";
export { calculateSubTotalPrice, calculateTotalPrice, getHasDeliveryPrice } from "./price";
