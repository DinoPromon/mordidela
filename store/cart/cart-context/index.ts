import { createContext } from "react";
import { CartContextState, CartOrder, CartProduct } from "@my-types/context";
import Cupom from "@models/cupom";

const CartContext = createContext({
  products: [],
  order: {},
  addProductToCart(product: CartProduct) {},
  removeProductFromCart(key: string) {},
  getProductTotalPrice(id: string): number | void {},
  changeDeliveryPrice(price: number) {},
  setPaymentAmount(amount: CartOrder["payment_amount"]) {},
  removeCupom() {},
  setCupom(cupom: Partial<Cupom>) {},
  setOrderType(type: CartOrder["order_type"]) {},
  setPaymentType(type: CartOrder["payment_type"]) {},
  resetCart() {},
} as CartContextState);

export default CartContext;
