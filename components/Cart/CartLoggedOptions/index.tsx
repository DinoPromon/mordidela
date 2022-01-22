import React, { Fragment, useContext, useEffect, useState } from "react";
import { useFormikContext } from "formik";
import CartCupom from "./CartCupom";
import Entrega from "@models/entrega";
import CartPayment from "./CartPayment";
import DeliveryPrice from "./DeliveryPrice";
import Loading from "@components/shared/Loading";
import { CartContext } from "@store/cart";
import { FormButton } from "@components/shared";
import { RequestState } from "@my-types/request";
import { CartFormValues } from "@components/Cart";
import {
  CartFormErrorContainer,
  CartFormErrorMessage,
  CartFormRightAlignText,
  CartFormTotalText,
} from "./styled";
import { transformPriceToString } from "@utils/transformation";

type Props = {
  subTotalPrice: number;
  request: RequestState;
  onChangeShouldShowConfirmation: (shouldShow: boolean) => void;
};

const CartLoggedOptions: React.FC<Props> = ({
  request,
  subTotalPrice,
  onChangeShouldShowConfirmation,
}) => {
  const { validateForm } = useFormikContext<CartFormValues>();
  const [formError, setFormError] = useState("");
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

  async function finishOrderClickHandler() {
    const errors = await validateForm();
    const firstError = Object.values(errors)[0];
    if (firstError) {
      return setFormError(firstError);
    }
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

      <CartPayment />
      <CartFormTotalText>
        Total: <span>R$ {transformPriceToString(totalPrice)}</span>
      </CartFormTotalText>
      <CartFormErrorContainer>
        {request.isLoading && <Loading />}
        {!request.isLoading && (
          <Fragment>
            {formError && <CartFormErrorMessage>{formError}</CartFormErrorMessage>}
            <FormButton onClick={finishOrderClickHandler}>Finalizar pedido</FormButton>
            {request.error && <CartFormErrorMessage>{request.error}</CartFormErrorMessage>}
          </Fragment>
        )}
      </CartFormErrorContainer>
    </Fragment>
  );
};

export default CartLoggedOptions;
