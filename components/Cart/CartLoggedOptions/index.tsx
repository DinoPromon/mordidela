import React, { Fragment, useContext, useEffect } from "react";

import CartPayment from "./CartPayment";
import CartCupom from "./CartCupom";
import Usuario from "@models/usuario";
import Entrega from "@models/entrega";
import Loading from "@components/shared/Loading";
import { CartContext } from "@store/cart";
import { FormButton } from "@components/shared";
import { transformPriceToString } from "@utils/transformation";
import { RequestState } from "@my-types/request";

type Props = {
  canSubmit: boolean;
  onSetIsPaymentOk: React.Dispatch<React.SetStateAction<boolean>>;
  subTotalPrice: number;
  userId: Usuario["id_usuario"];
  request: RequestState;
};

const CartLoggedOptions: React.FC<Props> = (props) => {
  const { order, changeDeliveryPrice } = useContext(CartContext);

  const isDelivery = order.order_type === "entrega";

  function getTotalPrice() {
    if (isDelivery && order.tipo_cupom !== "entrega")
      return props.subTotalPrice + (order.delivery_price as number);
    return props.subTotalPrice;
  }

  const totalPrice = getTotalPrice();

  useEffect(() => {
    async function getDeliveryPrice() {
      const response = await fetch(`/api/users/address/${props.userId}`);
      const result = (await response.json()) as Pick<Entrega, "preco_entrega">;
      changeDeliveryPrice(result.preco_entrega);
    }
    getDeliveryPrice();
  }, [changeDeliveryPrice]);

  return (
    <Fragment>
      {isDelivery && order.tipo_cupom !== "entrega" && (
        <p>
          Entrega: <span>R$ {transformPriceToString(order.delivery_price as number)}</span>
        </p>
      )}
      <CartCupom />
      {order.tipo_cupom === "entrega" && <p>Desconto de entrega aplicado.</p>}
      {order.tipo_cupom === "pedido" && order.valor_desconto && (
        <p>
          Desconto aplicado: <span>{order.valor_desconto}%</span>
        </p>
      )}
      <CartPayment totalPrice={totalPrice} onSetIsPaymentOk={props.onSetIsPaymentOk} />
      <p>
        Total: <span>R$ {transformPriceToString(totalPrice)}</span>
      </p>
      <div>
        {props.request.isLoading && <Loading />}
        {!props.request.isLoading && (
          <Fragment>
            {props.request.error && <p>{props.request.error}</p>}
            <FormButton type="submit" disabled={!props.canSubmit}>
              Finalizar pedido
            </FormButton>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default CartLoggedOptions;
