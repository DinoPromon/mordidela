import { useState, useEffect, useRef } from "react";

// import { ORDER_INITIAL_STATE } from "../CartContext";

import type { Dispatch, SetStateAction } from "react";
import type { CartProduct, CartOrder } from "@my-types/context";

enum CartPersistence {
  PRODUCTS = "cart_products",
}

export const useCartPersistence = () => {
  const isFirstMount = useRef(true);
  const [products, setProducts] = useState<CartProduct[]>([]);
  // const [order, setOrder] = useState<CartOrder>(ORDER_INITIAL_STATE);

  useEffect(() => {
    getPersistedCartProducts();
    isFirstMount.current = false;
  }, []);

  useEffect(() => {
    if (products.length === 0 && !isFirstMount.current) {
      if (sessionStorage.getItem(CartPersistence.PRODUCTS))
        sessionStorage.removeItem(CartPersistence.PRODUCTS);
      return;
    }

    sessionStorage.setItem(CartPersistence.PRODUCTS, JSON.stringify(products));
  }, [products]);

  function getPersistedCartProducts() {
    const persistedProducts = sessionStorage.getItem(CartPersistence.PRODUCTS);
    if (persistedProducts) {
      const persistedCartProducts = JSON.parse(persistedProducts) as CartProduct[];
      setProducts(persistedCartProducts);
    }
  }

  return [products, setProducts] as [CartProduct[], Dispatch<SetStateAction<CartProduct[]>>];
};
