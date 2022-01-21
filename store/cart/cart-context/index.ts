import { createContext } from "react";
import { CartContextState, CartOrder, CartProduct } from "@my-types/context";
import Cupom from "@models/cupom";
import Endereco from "@models/endereco";

export const orderInitialState: CartOrder = {
  address_id: null,
  delivery_type: null,
  payment_type: null,
  needChange: null,
  payment_amount: 0,
};

const CartContext = createContext({
  products: [],
  order: orderInitialState,
  addProductToCart(product: CartProduct) {},
  removeProductFromCart(key: string) {},
  getProductTotalPrice(id: string): number | void {},
  changeDeliveryPrice(price: number) {},
  removeCupom() {},
  setAddressId(id: Endereco["id_endereco"]) {},
  setPaymentAmount(amount: CartOrder["payment_amount"]) {},
  setNeedChange(needChange: boolean) {},
  setCupom(cupom: Partial<Cupom>) {},
  setDeliveryType(type: CartOrder["delivery_type"]) {},
  setPaymentType(type: string | null) {},
  resetCart() {},
} as CartContextState);

export default CartContext;
