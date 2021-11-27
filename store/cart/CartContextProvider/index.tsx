import { CartOrder, CartProduct } from "@my-types/context";
import React, { useState } from "react";
import { CartContextState } from "@my-types/context";
import CartContext from "../cart-context";

const CartContextProvider: React.FC = (props) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [order, setOrder] = useState<CartOrder>({});

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
    setOrder({
      ...order,
      delivery_price: price,
    });
  }

  function setOrderType(type: CartOrder["order_type"]) {
    setOrder({
      ...order,
      order_type: type,
    });
  }

  function setPaymentAmount(amount: CartOrder["payment_amount"]) {
    setOrder({
      ...order,
      payment_amount: amount,
    });
  }

  function setCupom(id: CartOrder["id_cupom"]) {
    setOrder({
      ...order,
      id_cupom: id,
    });
  }

  function setPaymentType(type: CartOrder["payment_type"]) {
    setOrder({
      ...order,
      payment_type: type,
    });
  }

  const context: CartContextState = {
    products: products,
    order,
    addProductToCart,
    removeProductFromCart,
    changeDeliveryPrice,
    setCupom,
    setOrderType,
    setPaymentAmount,
    setPaymentType,
  };

  return <CartContext.Provider value={context}>{props.children}</CartContext.Provider>;
};

export default CartContextProvider;
