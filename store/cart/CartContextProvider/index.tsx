import { CartProduct } from "@my-types/context";
import React, { useState } from "react";
import { CartContextState } from "@my-types/context";
import CartContext from "../cart-context";

const CartContextProvider: React.FC = (props) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  function incrementProductQuantity(key: string) {
    setProducts((prevState) =>
      prevState.map((item) => {
        if (item.key === key) return { ...item, quantity: item.quantity + 1 };
        return { ...item };
      })
    );
  }

  function addProductToCart(product: CartProduct) {
    for (let i in products) {
      if (products[i].key === product.key) return incrementProductQuantity(product.key);
    }
    setProducts((prevState) => [...prevState, product]);
  }

  function removeProductFromCart(key: string) {
    setProducts((prevState) => prevState.filter((item) => item.key !== key));
  }

  function changeDeliveryPrice(price: number) {
    setDeliveryPrice(price);
  }

  const context: CartContextState = {
    delivery_price: deliveryPrice,
    products: products,
    addProductToCart,
    removeProductFromCart,
    changeDeliveryPrice,
  };

  return <CartContext.Provider value={context}>{props.children}</CartContext.Provider>;
};

export default CartContextProvider;
