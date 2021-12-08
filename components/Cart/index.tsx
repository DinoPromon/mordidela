import React, { useContext, Fragment, useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import type { Session } from "next-auth";

import CustomForm from "./styled";
import CartOrdersList from "./CartOrdersList";
import CartDeliveryType from "./CartDeliveryType";
import CartEmptyMessage from "./CartEmptyMessage";
import CartLoggedOptions from "./CartLoggedOptions";
import { CartContext } from "@store/cart";
import { Modal } from "@components/shared";
import { RequestState } from "@my-types/request";
import { transformPriceToString } from "@utils/transformation";

type Props = {
  onCloseModal: () => void;
};

const Cart: React.FC<Props> = ({ onCloseModal }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [request, setRequest] = useState<RequestState>({ error: "", isLoading: false, success: false });
  const { products, order, resetCart } = useContext(CartContext);
  const [isPaymentOk, setIsPaymentOk] = useState(false);

  const canSubmit = isPaymentOk && order.order_type !== undefined;

  function getSubTotalPrice() {
    const subTotal = products.reduce((acc, cur) => (acc += cur.total_price * cur.quantity), 0);
    if (order.tipo_cupom === "pedido" && order.valor_desconto) return ((100 - order.valor_desconto) * subTotal) / 100;
    return subTotal;
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (session) {
        const produtos = products.map((item) => ({
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

        if (canSubmit) {
          setRequest({ error: "", isLoading: true, success: false });
          const response = await fetch("/api/order", {
            method: "POST",
            body: JSON.stringify({ produtos, pedido }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          if (!response.ok) throw new Error(result.message || "");
          setRequest({ error: "", isLoading: false, success: true });
          onCloseModal();
          resetCart();
        }
        return;
      }
      throw new Error("É necessário estar logado para finalizar pedidos.");
    } catch (e) {
      const error = e as Error;
      setRequest({ error: error.message, isLoading: false, success: false });
    }
  }

  useEffect(() => {
    async function hasSession() {
      const result = await getSession();
      setSession(result);
      setIsLoadingSession(false);
    }
    if (!session) hasSession();
  }, []);

  const subTotalPrice = getSubTotalPrice();

  return (
    <Modal onClose={onCloseModal}>
      <CustomForm onSubmit={submitHandler}>
        {!products.length && <CartEmptyMessage />}
        {products.length > 0 && (
          <Fragment>
            <h2>Seu pedido</h2>
            {session && <CartDeliveryType />}
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
                request={request}
              />
            )}
            {!session && !isLoadingSession && <p>Faça login para continuar sua compra!</p>}
          </Fragment>
        )}
      </CustomForm>
    </Modal>
  );
};

export default Cart;
