import React, { Fragment, useContext, useEffect } from "react";

import CartPayment from "./CartPayment";
import CartCupom from "./CartCupom";
import { CartContext } from "@store/cart";
import { FormButton } from "@components/shared";
import { transformPriceToString } from "@utils/transformation/price";
import Usuario from "@models/usuario";
import Entrega from "@models/entrega";

type Props = {
  canSubmit: boolean;
  onSetIsPaymentOk: React.Dispatch<React.SetStateAction<boolean>>;
  subTotalPrice: number;
  userId: Usuario["id_usuario"];
};

const CartLoggedOptions: React.FC<Props> = (props) => {
  const { order, changeDeliveryPrice } = useContext(CartContext);

  const isDelivery = order.order_type === "entrega";
  const totalPrice = props.subTotalPrice + (isDelivery ? (order.delivery_price as number) : 0);

  useEffect(() => {
    async function getDeliveryPrice() {
      const response = await fetch(`/api/users/address/${props.userId}`);
      const result = (await response.json()) as Pick<Entrega, "preco_entrega">;
      changeDeliveryPrice(result.preco_entrega);
    }
    getDeliveryPrice();
  }, []);

  return (
    <Fragment>
      {isDelivery && (
        <p>
          Entrega: <span>R$ {transformPriceToString(order.delivery_price as number)}</span>
        </p>
      )}
      <CartCupom />
      <CartPayment totalPrice={totalPrice} onSetIsPaymentOk={props.onSetIsPaymentOk} />
      <p>
        Total: <span>R$ {transformPriceToString(totalPrice)}</span>
      </p>
      <FormButton type="submit" disabled={!props.canSubmit}>
        Finalizar pedido
      </FormButton>
    </Fragment>
  );
};

export default CartLoggedOptions;
