import { createContext } from "react";
import { CartContextState, CartOrder, CartProduct } from "@my-types/context";
import Cupom from "@models/cupom";
import Endereco from "@models/endereco";

const CartContext = createContext({
  products: [],
  order: {},
  addProductToCart(product: CartProduct) {},
  removeProductFromCart(key: string) {},
  getProductTotalPrice(id: string): number | void {},
  changeDeliveryPrice(price: number) {},
  removeCupom() {},
  setAddressId(id: Endereco["id_endereco"]) {},
  setPaymentAmount(amount: CartOrder["payment_amount"]) {},
  setCupom(cupom: Partial<Cupom>) {},
  setOrderType(type: CartOrder["order_type"]) {},
  setPaymentType(type: CartOrder["payment_type"]) {},
  resetCart() {},
} as CartContextState);

export default CartContext;
