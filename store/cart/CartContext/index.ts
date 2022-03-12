import { createContext } from "react";
import { CartContextState } from "@my-types/context";

import type ICupom from "@models/cupom";
import type IPedido from "@models/pedido";
import type IEndereco from "@models/endereco";
import type { CartOrder } from "@my-types/context";
import type { CartProduct } from "@my-types/context";

export const ORDER_INITIAL_STATE: CartOrder = Object.freeze({
  address_id: null,
  delivery_type: null,
  payment_type: null,
  payment_amount: 0,
  delivery_price: 0,
});

const CartContext = createContext({
  products: [],
  order: ORDER_INITIAL_STATE,
  addProductToCart(product: CartProduct) {},
  removeProductFromCart(key: string) {},
  getProductTotalPrice(id: string): number | void {},
  changeDeliveryPrice(price: number) {},
  removeCupom() {},
  setAddressId(id: IEndereco["id_endereco"]) {},
  setPaymentAmount(amount: CartOrder["payment_amount"]) {},
  setCupom(cupom: Partial<ICupom>) {},
  setDeliveryType(type: CartOrder["delivery_type"]) {},
  setPaymentType(type: string | null) {},
  setDeliveryPrice(deliveryPrice: IPedido["preco_entrega"]) {},
  resetCart() {},
} as CartContextState);

export default CartContext;
