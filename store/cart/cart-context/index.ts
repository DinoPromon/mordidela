import { createContext } from "react";
import { CartContextState, CartProduct } from "@my-types/context";

const CartContext = createContext({
  products: [],
  delivery_price: 0,
} as CartContextState);

export default CartContext;
