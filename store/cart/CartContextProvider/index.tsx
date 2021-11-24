import { CartProduct } from "@my-types/context";
import React, { useState } from "react";
import { CartContextState } from "@my-types/context";
import CartContext from "../cart-context";

const CartContextProvider: React.FC = (props) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  function addProductToCart(product: CartProduct) {
    setProducts((prevState) => [...prevState, product]);
  }

  function removeProductFromCart(product: CartProduct) {
    setProducts((prevState) =>
      prevState.filter((item) => {
        item.id !== product.id;
      })
    );
  }

  function getProductTotalPrice(id: string) {
    for (const i in products) {
      if (products[i].id === id) return calculateProductTotalPrice(products[i]);
    }
  }

  function changeDeliveryPrice(price: number) {
    setDeliveryPrice(price);
  }

  function calculateProductTotalPrice(product: CartProduct) {
    const standardPrice = product.standard_price;
    const addsPrice = product.adds.reduce((acc, cur) => (acc += cur.preco), 0);
    return standardPrice + addsPrice;
  }

  const context: CartContextState = {
    delivery_price: deliveryPrice,
    products: products,
    addProductToCart,
    getProductTotalPrice,
    removeProductFromCart,
    changeDeliveryPrice
  };

  return <CartContext.Provider value={context}>{props.children}</CartContext.Provider>;
};

export default CartContextProvider;
