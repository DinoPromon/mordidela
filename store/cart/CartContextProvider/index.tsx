import { CartOrder, CartProduct } from "@my-types/context";
import React, { useState } from "react";
import { CartContextState } from "@my-types/context";
import CartContext from "../cart-context";
import Cupom from "@models/cupom";
import Endereco from "@models/endereco";

const CartContextProvider: React.FC = (props) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [order, setOrder] = useState<CartOrder>({});

  const incrementProductQuantity = React.useCallback((key: string) => {
    setProducts((prevState) =>
      prevState.map((item) => {
        if (item.key === key) return { ...item, quantity: item.quantity + 1 };
        return { ...item };
      })
    );
  }, []);

  const addProductToCart = React.useCallback(
    (product: CartProduct) => {
      setProducts((prevState) => {
        for (const i in prevState) {
          if (prevState[i].key === product.key) {
            incrementProductQuantity(product.key);
            return prevState;
          }
        }
        return [...prevState, product];
      });
    },
    [incrementProductQuantity]
  );

  function removeProductFromCart(key: string) {
    setProducts((prevState) => prevState.filter((item) => item.key !== key));
  }

  const changeDeliveryPrice = React.useCallback((price: number) => {
    setOrder((prevState) => ({
      ...prevState,
      delivery_price: price,
    }));
  }, []);

  const setOrderType = React.useCallback((type: CartOrder["order_type"]) => {
    setOrder((prevState) => ({
      ...prevState,
      order_type: type,
    }));
  }, []);

  const setPaymentAmount = React.useCallback((amount: CartOrder["payment_amount"]) => {
    setOrder((prevState) => ({
      ...prevState,
      payment_amount: amount,
    }));
  }, []);

  const setCupom = React.useCallback((cupom: Partial<Cupom>) => {
    setOrder((prevState) => ({
      ...prevState,
      id_cupom: cupom.id_cupom,
      codigo_cupom: cupom.codigo,
      valor_desconto: cupom.valor_desconto,
      tipo_cupom: cupom.tipo,
    }));
  }, []);

  const removeCupom = React.useCallback(() => {
    setOrder((prevState) => ({
      ...prevState,
      id_cupom: undefined,
      codigo_cupom: undefined,
      valor_desconto: undefined,
    }));
  }, []);

  const setPaymentType = React.useCallback((type: CartOrder["payment_type"]) => {
    setOrder((prevState) => ({
      ...prevState,
      payment_type: type,
    }));
  }, []);

  const setAddressId = React.useCallback((addressId: Endereco["id_endereco"]) => {
    setOrder((prevState) => ({
      ...prevState,
      address_id: addressId,
    }));
  }, []);

  const resetCart = React.useCallback(() => {
    setOrder({});
    setProducts([]);
  }, []);

  const context: CartContextState = {
    products: products,
    order,
    addProductToCart,
    resetCart,
    removeProductFromCart,
    changeDeliveryPrice,
    setCupom,
    removeCupom,
    setAddressId,
    setOrderType,
    setPaymentAmount,
    setPaymentType,
  };

  return <CartContext.Provider value={context}>{props.children}</CartContext.Provider>;
};

export default CartContextProvider;
