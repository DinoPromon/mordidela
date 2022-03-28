import type ICupom from "@models/cupom";
import { TipoEntrega } from "@models/pedido";
import { calculateAddsTotalPrice } from "./add";
import { calculateCouponDiscount } from "./coupon";

import type { OrderProductRelation, OrderProductAddRelation } from "./types";

export function calculateSubTotalPrice(
  orderProducts: OrderProductRelation[],
  orderProductAdds: OrderProductAddRelation[]
) {
  const subtTotalPrice = orderProducts.reduce((totalPrice, orderProduct) => {
    const addsTotalPrice = calculateAddsTotalPrice(
      orderProductAdds,
      orderProduct.id_pedido,
      orderProduct.id_produto
    );

    return (
      totalPrice + (orderProduct.produto.preco_padrao + addsTotalPrice) * orderProduct.quantidade
    );
  }, 0);

  return subtTotalPrice;
}

export function getHasDeliveryPrice(deliveryType: TipoEntrega) {
  if (deliveryType === TipoEntrega.BALCAO) {
    return false;
  }

  return true;
}

export function calculateTotalPrice(
  orderProducts: OrderProductRelation[],
  orderProductAdds: OrderProductAddRelation[],
  deliveryType: TipoEntrega,
  deliveryPrice: number,
  cupom: ICupom | null
) {
  const subTotalPrice = calculateSubTotalPrice(orderProducts, orderProductAdds);
  const hasDeliveryPrice = getHasDeliveryPrice(deliveryType);

  if (hasDeliveryPrice) {
    return (
      subTotalPrice +
      deliveryPrice -
      calculateCouponDiscount(orderProducts, orderProductAdds, cupom, deliveryPrice)
    );
  }

  return (
    subTotalPrice - calculateCouponDiscount(orderProducts, orderProductAdds, cupom, deliveryPrice)
  );
}
