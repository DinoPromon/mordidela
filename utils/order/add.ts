import type { OrderProductAddRelation } from "./types";

function filterOrderProductAdds(
  orderProductAdds: OrderProductAddRelation[],
  orderId: OrderProductAddRelation["id_pedido"],
  productId: OrderProductAddRelation["id_produto"]
) {
  const filteredOrderProductAdds = orderProductAdds.filter(
    ({ id_pedido, id_produto }) => id_pedido === orderId && id_produto === productId
  );

  return filteredOrderProductAdds;
}

export function calculateAddsTotalPrice(
  orderProductAdds: OrderProductAddRelation[] | null,
  orderId: OrderProductAddRelation["id_pedido"],
  productId: OrderProductAddRelation["id_produto"]
) {
  if (!orderProductAdds) return 0;

  const filteredOrderProductAdds = filterOrderProductAdds(orderProductAdds, orderId, productId);
  const addsTotalPrice = filteredOrderProductAdds.reduce(
    (totalPrice, orderProductAdd) => totalPrice + Number(orderProductAdd.adicional.preco as number),
    0
  );

  return addsTotalPrice;
}

export function getAddsInOrderProduct(
  orderProductAdds: OrderProductAddRelation[],
  orderId: OrderProductAddRelation["id_pedido"],
  productId: OrderProductAddRelation["id_produto"]
) {
  const filteredOrderProductAdds = filterOrderProductAdds(orderProductAdds, orderId, productId);

  const addsInOrderProduct = filteredOrderProductAdds.map(
    (orderProductAdd) => orderProductAdd.adicional
  );

  return addsInOrderProduct;
}
