import React, { useContext, Fragment, useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import type { Session } from "next-auth";

import CustomForm from "./styled";
import CartOrdersList from "./CartOrdersList";
import CartDeliveryType from "./CartDeliveryType";
import CartEmptyMessage from "./CartEmptyMessage";
import CartLoggedOptions from "./CartLoggedOptions";
import { CartContext } from "@store/cart";
import { transformPriceToString } from "@utils/transformation/price";

const Cart: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const { products, order } = useContext(CartContext);
  const [isPaymentOk, setIsPaymentOk] = useState(false);

  const canSubmit = isPaymentOk && order.order_type !== undefined;

  function getSubTotalPrice() {
    return products.reduce((acc, cur) => (acc += cur.total_price), 0);
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (session) {
      return console.log(order, products);
    }
    return console.log("é necessário estar logado para finalizar pedidos.");
  }

  useEffect(() => {
    async function hasSession() {
      setSession(await getSession());
    }
    if (!session) {
      hasSession();
    }
  }, []);

  const subTotalPrice = getSubTotalPrice();

  return (
    <CustomForm onSubmit={submitHandler}>
      {!products.length && <CartEmptyMessage />}
      {products.length > 0 && (
        <Fragment>
          <h2>Seu pedido</h2>
          <CartDeliveryType />
          <CartOrdersList products={products} />
          <p>
            Subtotal: <span>R$ {transformPriceToString(subTotalPrice)}</span>
          </p>
          {session && (
            <CartLoggedOptions
              canSubmit={canSubmit}
              onSetIsPaymentOk={setIsPaymentOk}
              subTotalPrice={subTotalPrice}
              userId={session.user.id_usuario}
            />
          )}
          {!session && <p>Faça login para continuar sua compra!</p>}
        </Fragment>
      )}
    </CustomForm>
  );
};

export default Cart;
