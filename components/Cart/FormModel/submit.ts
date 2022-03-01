import { TipoEntrega } from "@models/pedido";
import { transformPriceStringToNumber } from "@utils/transformation";

import type IUsuario from "@models/usuario";
import type { CartProduct } from "@my-types/context";
import type { CartFormValues } from "./index";

function checkHasAddressId(deliveryType: TipoEntrega) {
  if (deliveryType === TipoEntrega.BALCAO) return false;
  return true;
}

export function getCartSubmitData(
  formValues: CartFormValues,
  products: CartProduct[],
  userId: IUsuario["id_usuario"]
) {
  const produtos = products.map((item) => ({
    id_produto: item.product_id,
    quantidade: item.quantity,
    observacao: item.orderNote ? item.orderNote : null,
    adicionais: item.adds.map((add) => add.id_adicional),
    sabores: item.flavors.map((flavor) => flavor.id_sabor),
  }));

  const pedido = {
    troco_para: formValues.paymentAmount
      ? transformPriceStringToNumber(formValues.paymentAmount)
      : null,
    id_cupom: formValues.coupon ? formValues.coupon.id_cupom : null,
    tipo_pagamento: formValues.paymentType,
    tipo_entrega: formValues.deliveryType,
    id_endereco: checkHasAddressId(formValues.deliveryType as TipoEntrega)
      ? formValues.addressId
      : null,
    id_usuario: userId,
  };

  return {
    productsData: produtos,
    orderData: pedido,
  };
}
