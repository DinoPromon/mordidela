import { createContext } from "react";
import { CartContextState, CartOrder, CartProduct } from "@my-types/context";

const CartContext = createContext({
  products: [],
  order: {},
  addProductToCart(product: CartProduct) {},
  removeProductFromCart(key: string) {},
  getProductTotalPrice(id: string): number | void {},
  changeDeliveryPrice(price: number) {},
  setPaymentAmount(amount: CartOrder["payment_amount"]) {},
  setCupom(id: CartOrder["id_cupom"]) {},
  setOrderType(type: CartOrder["order_type"]) {},
  setPaymentType(type: CartOrder["payment_type"]) {},
} as CartContextState);

export default CartContext;
