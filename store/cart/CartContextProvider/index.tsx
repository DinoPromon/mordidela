import React, { useState } from "react";

import { CartContextState } from "@my-types/context";

import CartContext from "../CartContext";
import { ORDER_INITIAL_STATE } from "../CartContext";
import { useCartPersistence } from "./hooks/useCartPersistence";

import type ICupom from "@models/cupom";
import type IPedido from "@models/pedido";
import type IEndereco from "@models/endereco";
import type { CartOrder, CartProduct } from "@my-types/context";

const CartContextProvider: React.FC = (props) => {
  const [products, setProducts] = useCartPersistence();
  const [order, setOrder] = useState<CartOrder>(ORDER_INITIAL_STATE);

  const incrementProductQuantity = React.useCallback(
    (key: string) => {
      setProducts((prevState) =>
        prevState.map((item) => {
          if (item.key === key) return { ...item, quantity: item.quantity + 1 };
          return { ...item };
        })
      );
    },
    [setProducts]
  );

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
    [incrementProductQuantity, setProducts]
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

  const setDeliveryType = React.useCallback((type: CartOrder["delivery_type"]) => {
    setOrder((prevState) => ({
      ...prevState,
      delivery_type: type,
    }));
  }, []);

  const setPaymentAmount = React.useCallback((amount: CartOrder["payment_amount"]) => {
    setOrder((prevState) => ({
      ...prevState,
      payment_amount: amount,
    }));
  }, []);

  const setCupom = React.useCallback((cupom: Partial<ICupom>) => {
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

  const setPaymentType = React.useCallback((type: string | null) => {
    setOrder((prevState) => ({
      ...prevState,
      payment_type: type,
    }));
  }, []);

  const setAddressId = React.useCallback((addressId: IEndereco["id_endereco"] | null) => {
    setOrder((prevState) => ({
      ...prevState,
      address_id: addressId,
    }));
  }, []);

  const setDeliveryPrice = React.useCallback((deliveryPrice: IPedido["preco_entrega"]) => {
    setOrder((prevState) => ({
      ...prevState,
      delivery_price: deliveryPrice,
    }));
  }, []);

  const resetCart = React.useCallback(() => {
    setOrder(ORDER_INITIAL_STATE);
    setProducts([]);
  }, [setProducts]);

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
    setDeliveryType,
    setPaymentAmount,
    setPaymentType,
    setDeliveryPrice,
  };

  return <CartContext.Provider value={context}>{props.children}</CartContext.Provider>;
};

export default CartContextProvider;
