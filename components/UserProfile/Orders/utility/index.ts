import { TipoCupom } from "@models/cupom";
import { TipoEntrega, TipoPagamento } from "@models/pedido";

import type IPedido from "@models/pedido";
import type IProduto from "@models/produto";
import type { IOrderRelations } from "@models/pedido";

function filterOrderProductAdds(
  orderRelations: IOrderRelations,
  orderId: IPedido["id_pedido"],
  productId: IProduto["id_produto"]
) {
  const filteredOrderProductAdds = orderRelations.pedido_produto_adicional.filter(
    ({ id_pedido, id_produto }) => id_pedido === orderId && id_produto === productId
  );

  return filteredOrderProductAdds;
}

function calculateAddsTotalPrice(
  orderRelations: IOrderRelations,
  orderId: IPedido["id_pedido"],
  productId: IPedido["id_pedido"]
) {
  const filteredOrderProductAdds = filterOrderProductAdds(orderRelations, orderId, productId);
  const addsTotalPrice = filteredOrderProductAdds.reduce(
    (totalPrice, orderProductAdd) =>
      totalPrice + Number(orderProductAdd.adicional?.preco as number),
    0
  );

  return addsTotalPrice;
}

export function getNumberAsCurrency(number: number) {
  const formatedDefaultPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);

  return formatedDefaultPrice;
}

export function getOrderPaymentTypeText(orderRelations: IOrderRelations) {
  switch (orderRelations.tipo_pagamento) {
    case TipoPagamento.CREDITO:
      return "crédito";
    case TipoPagamento.DEBITO:
      return "débito";
    case TipoPagamento.DINHEIRO:
      if (orderRelations.troco_para)
        return `dinheiro (troco para ${getNumberAsCurrency(orderRelations.troco_para)})`;
      return `dinheiro`;
    default:
      const exhaustiveCheck = orderRelations.tipo_pagamento;
      return exhaustiveCheck;
  }
}

export function getHasDeliveryPrice(orderRelations: IOrderRelations) {
  if (orderRelations.tipo_entrega === TipoEntrega.BALCAO) {
    return false;
  }
  if (orderRelations.cupom && orderRelations.cupom.tipo === TipoCupom.ENTREGA) {
    return false;
  }

  return true;
}

export function calculateCouponDiscount(orderRelations: IOrderRelations) {
  const coupon = orderRelations.cupom;

  if (!coupon) return 0;

  switch (coupon.tipo) {
    case TipoCupom.ENTREGA:
      return orderRelations.preco_entrega;
    case TipoCupom.PEDIDO:
      return calculateSubTotalPrice(orderRelations) * (coupon.valor_desconto / 100);
    default:
      const exhaustiveCheck = coupon.tipo;
      return exhaustiveCheck;
  }
}

export function calculateSubTotalPrice(orderRelations: IOrderRelations) {
  const subtTotalPrice = orderRelations.pedido_produto.reduce((totalPrice, orderProduct) => {
    const product = orderProduct.produto as IProduto;
    const addsTotalPrice = calculateAddsTotalPrice(
      orderRelations,
      orderProduct.id_pedido,
      orderProduct.id_produto
    );

    return totalPrice + product.preco_padrao + addsTotalPrice;
  }, 0);

  return subtTotalPrice;
}

export function calculateTotalPrice(orderRelations: IOrderRelations) {
  const subTotalPrice = calculateSubTotalPrice(orderRelations);
  const hasDeliveryPrice = getHasDeliveryPrice(orderRelations);
  if (orderRelations.cupom !== null) {
  }

  if (hasDeliveryPrice)
    return subTotalPrice + orderRelations.preco_entrega - calculateCouponDiscount(orderRelations);

  return subTotalPrice - calculateCouponDiscount(orderRelations);
}
