import type { OrderProductFlavorRelation, OrderProductRelation } from "./types";

export function getProductHasFlavors(
  orderProduct: OrderProductRelation,
  orderProductFlavors: OrderProductFlavorRelation[]
) {
  const hasFlavors = orderProductFlavors.find(
    (orderProductFlavor) => orderProductFlavor.id_produto === orderProduct.id_produto
  );

  return !!hasFlavors;
}
