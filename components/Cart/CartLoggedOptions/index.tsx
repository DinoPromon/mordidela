import React, { Fragment, useContext, useEffect, useState } from "react";
import { useFormikContext } from "formik";
import CartCupom from "./CartCupom";
import Entrega from "@models/entrega";
import CartPayment from "./CartPayment";
import Loading from "@components/shared/Loading";
import { CustomFade } from "@components/shared";
import { CartContext } from "@store/cart";
import { FormButton } from "@components/shared";
import { RequestState } from "@my-types/request";
import { CartFormValues } from "@components/Cart";
import { CartFormSubtotalText } from "../styled";
import { CartFormErrorContainer, CartFormErrorMessage, CartFormTotalText } from "./styled";
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
    setFormError("");
  }, [order]);

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
      <CustomFade triggerAnimation={Boolean(order.delivery_price)}>
        <CartFormSubtotalText>
          Entrega: <span>R$ {transformPriceToString(Number(order.delivery_price))}</span>
        </CartFormSubtotalText>
      </CustomFade>
      <CartCupom />

      <CustomFade triggerAnimation={order.tipo_cupom === "entrega"}>
        <CartFormSubtotalText>Desconto de entrega aplicado.</CartFormSubtotalText>
      </CustomFade>

      <CustomFade triggerAnimation={order.tipo_cupom === "pedido" && Boolean(order.valor_desconto)}>
        <CartFormSubtotalText>
          Desconto aplicado: <span>{order.valor_desconto}%</span>
        </CartFormSubtotalText>
      </CustomFade>

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
