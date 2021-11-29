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
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const { products, order } = useContext(CartContext);
  const [isPaymentOk, setIsPaymentOk] = useState(false);

  const canSubmit = isPaymentOk && order.order_type !== undefined;

  function getSubTotalPrice() {
    const subTotal = products.reduce((acc, cur) => (acc += cur.total_price), 0);
    if (order.valor_desconto) return ((100 - order.valor_desconto) * subTotal) / 100;
    return subTotal;
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (session) {
      const produtos = products.map((item, index) => ({
        id_produto: item.product_id,
        quantidade: item.quantity,
        observacao: item.orderNote,
        adicionais: JSON.stringify(item.adds.map((add) => add.id_adicional)),
        sabores: JSON.stringify(item.flavors.map((flavor) => flavor.id_sabor)),
      }));

      const pedido = {
        troco_para: order.payment_amount,
        id_cupom: order.id_cupom,
        tipo_pagamento: order.payment_type,
        tipo_entrega: order.order_type,
        id_usuario: session.user.id_usuario,
      };

      fetch("/api/order", {
        method: "POST",
        body: JSON.stringify({ produtos, pedido }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return console.log(order, products);
    }
    return console.log("é necessário estar logado para finalizar pedidos.");
  }

  useEffect(() => {
    async function hasSession() {
      const result = await getSession();
      setSession(result);
      setIsLoadingSession(false);
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
          {session && !isLoadingSession && (
            <CartLoggedOptions
              canSubmit={canSubmit}
              onSetIsPaymentOk={setIsPaymentOk}
              subTotalPrice={subTotalPrice}
              userId={session.user.id_usuario}
            />
          )}
          {!session && !isLoadingSession && <p>Faça login para continuar sua compra!</p>}
        </Fragment>
      )}
    </CustomForm>
  );
};

export default Cart;
