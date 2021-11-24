import { createContext } from "react";
import { CartContextState, CartProduct } from "@my-types/context";

const CartContext = createContext({
  products: [],
  delivery_price: 0,
  addProductToCart(product: CartProduct) {},
  removeProductFromCart(product: CartProduct) {},
  getProductTotalPrice(id: string): number | void {},
  changeDeliveryPrice(price: number) {},
} as CartContextState);

export default CartContext;
