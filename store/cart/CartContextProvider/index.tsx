import { CartProduct } from "@my-types/context";
import React, { useState } from "react";
import { CartContextState } from "@my-types/context";
import CartContext from "../cart-context";

const CartContextProvider: React.FC = (props) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [deliveryPrice, setDeliveryPrice] = useState(0);


  const context: CartContextState = {
    delivery_price: deliveryPrice,
    products: products,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;