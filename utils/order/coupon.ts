import { TipoCupom } from "@models/cupom";
import { calculateSubTotalPrice } from "./price";

import type ICupom from "@models/cupom";
import type { OrderProductAddRelation, OrderProductRelation } from "./types";

export function calculateCouponDiscount(
  orderProducts: OrderProductRelation[],
  orderProductAdds: OrderProductAddRelation[],
  coupon: ICupom | null,
  deliveryPrice: number
) {
  if (!coupon) return 0;

  switch (coupon.tipo) {
    case TipoCupom.ENTREGA: {
      return deliveryPrice;
    }

    case TipoCupom.PEDIDO: {
      return (
        calculateSubTotalPrice(orderProducts, orderProductAdds) * (coupon.valor_desconto / 100)
      );
    }

    default: {
      const exhaustiveCheck = coupon.tipo;
      return exhaustiveCheck;
    }
  }
}
