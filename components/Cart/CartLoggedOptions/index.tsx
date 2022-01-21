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
import { CartPaymentSelectProps } from "./CartPayment/CartPaymentSelect";
import {
  CartFormErrorContainer,
  CartFormErrorMessage,
  CartFormRightAlignText,
  CartFormTotalText,
} from "./styled";
import { transformPriceToString } from "@utils/transformation";

type Props = {
  canSubmit: boolean;
  subTotalPrice: number;
  request: RequestState;
  onSetIsPaymentOk: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeShouldShowConfirmation: (shouldShow: boolean) => void;
} & CartPaymentSelectProps;

const CartLoggedOptions: React.FC<Props> = ({
  canSubmit,
  subTotalPrice,
  request,
  selectedPaymentType,
  onSetIsPaymentOk,
  onSetPaymentType,
  onChangeShouldShowConfirmation,
}) => {
  const { order, changeDeliveryPrice } = useContext(CartContext);

  const isDelivery = order.delivery_type === "entrega";
  const totalPrice = getTotalPrice();
  const shouldShowDeliveryPrice = isDelivery && order.tipo_cupom !== "entrega";

  function getTotalPrice() {
    if (isDelivery && order.tipo_cupom !== "entrega" && order.delivery_price) {
      return subTotalPrice + order.delivery_price;
    }
    return subTotalPrice;
  }

  function finishOrderClickHandler() {
    onChangeShouldShowConfirmation(true);
  }

  useEffect(() => {
    async function getDeliveryPrice() {
      const response = await fetch(`/api/address/delivery_price/${order.address_id}`);
      const result = (await response.json()) as Pick<Entrega, "preco_entrega">;
      changeDeliveryPrice(result.preco_entrega);
    }
    if (order.address_id) {
      getDeliveryPrice();
    }
  }, [changeDeliveryPrice, order.address_id]);

  return (
    <Fragment>
      {order.delivery_price && (
        <DeliveryPrice
          deliveryPrice={order.delivery_price as number}
          shoulShowDeliveryPrice={shouldShowDeliveryPrice}
        />
      )}
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

      <CartPayment
        totalPrice={totalPrice}
        onSetIsPaymentOk={onSetIsPaymentOk}
        onSetPaymentType={onSetPaymentType}
        selectedPaymentType={selectedPaymentType}
      />
      <CartFormTotalText>
        Total: <span>R$ {transformPriceToString(totalPrice)}</span>
      </CartFormTotalText>
      <CartFormErrorContainer>
        {request.isLoading && <Loading />}
        {!request.isLoading && (
          <Fragment>
            {request.error && <CartFormErrorMessage>{request.error}</CartFormErrorMessage>}
            <FormButton disabled={!canSubmit} onClick={finishOrderClickHandler}>
              Finalizar pedido
            </FormButton>
          </Fragment>
        )}
      </CartFormErrorContainer>
    </Fragment>
  );
};

export default CartLoggedOptions;
