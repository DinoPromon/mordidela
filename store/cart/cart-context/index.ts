import { createContext } from "react";
import { CartContextState, CartOrder, CartProduct } from "@my-types/context";
import Cupom from "@models/cupom";
import Endereco from "@models/endereco";

export const orderInitialState: CartOrder = {
  address_id: null,
  order_type: null,
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
  setCupom(cupom: Partial<Cupom>) {},
  setOrderType(type: CartOrder["order_type"]) {},
  setPaymentType(type: CartOrder["payment_type"]) {},
  resetCart() {},
} as CartContextState);

export default CartContext;
