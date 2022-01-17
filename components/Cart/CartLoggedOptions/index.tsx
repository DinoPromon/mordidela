import React, { Fragment, useContext, useEffect } from "react";

import CartCupom from "./CartCupom";
import Usuario from "@models/usuario";
import Entrega from "@models/entrega";
import CartPayment from "./CartPayment";
import DeliveryPrice from "./DeliveryPrice";
import Loading from "@components/shared/Loading";
import { CartContext } from "@store/cart";
import { FormButton } from "@components/shared";
import { RequestState } from "@my-types/request";
import { CartFormErrorContainer, CartFormErrorMessage, CartFormRightAlignText, CartFormTotalText } from "./styled";
import { transformPriceToString } from "@utils/transformation";

type Props = {
  canSubmit: boolean;
  subTotalPrice: number;
  request: RequestState;
  userId: Usuario["id_usuario"];
  onSetIsPaymentOk: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeShouldShowConfirmation: (shouldShow: boolean) => void;
};

const CartLoggedOptions: React.FC<Props> = (props) => {
  const { order, changeDeliveryPrice } = useContext(CartContext);

  const isDelivery = order.order_type === "entrega";
  const totalPrice = getTotalPrice();
  const shouldShowDeliveryPrice = isDelivery && order.tipo_cupom !== "entrega";

  function getTotalPrice() {
    if (isDelivery && order.tipo_cupom !== "entrega") return props.subTotalPrice + (order.delivery_price as number);
    return props.subTotalPrice;
  }

  function finishOrderClickHandler() {
    props.onChangeShouldShowConfirmation(true);
  }

  useEffect(() => {
    async function getDeliveryPrice() {
      const response = await fetch(`/api/address/delivery_price/${props.userId}`);
      const result = (await response.json()) as Pick<Entrega, "preco_entrega">;
      changeDeliveryPrice(result.preco_entrega);
    }
    getDeliveryPrice();
  }, [changeDeliveryPrice, props.userId]);

  return (
    <Fragment>
      <DeliveryPrice deliveryPrice={order.delivery_price as number} shoulShowDeliveryPrice={shouldShowDeliveryPrice} />
      <CartCupom />
      {order.tipo_cupom === "entrega" && (
        <CartFormRightAlignText shouldShowComponent={order.tipo_cupom === "entrega"}>
          Desconto de entrega aplicado.
        </CartFormRightAlignText>
      )}
      {order.tipo_cupom === "pedido" && order.valor_desconto && (
        <CartFormRightAlignText shouldShowComponent={Boolean(order.valor_desconto)}>
          Desconto aplicado: <span>{order.valor_desconto}%</span>
        </CartFormRightAlignText>
      )}
      <CartPayment totalPrice={totalPrice} onSetIsPaymentOk={props.onSetIsPaymentOk} />
      <CartFormTotalText>
        Total: <span>R$ {transformPriceToString(totalPrice)}</span>
      </CartFormTotalText>
      <CartFormErrorContainer>
        {props.request.isLoading && <Loading />}
        {!props.request.isLoading && (
          <Fragment>
            {props.request.error && <CartFormErrorMessage>{props.request.error}</CartFormErrorMessage>}
            <FormButton disabled={!props.canSubmit} onClick={finishOrderClickHandler}>
              Finalizar pedido
            </FormButton>
          </Fragment>
        )}
      </CartFormErrorContainer>
    </Fragment>
  );
};

export default CartLoggedOptions;
