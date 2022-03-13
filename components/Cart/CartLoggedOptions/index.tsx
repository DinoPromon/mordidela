import React, { Fragment, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Button from "@material-ui/core/Button";
import { useFormikContext } from "formik";
import { FaTrash } from "react-icons/fa/index";
import { AnimatePresence, motion } from "framer-motion";

import Loading from "@components/shared/Loading";
import useRequestState from "@hooks/useRequestState";
import { PINK } from "@utils/colors";
import { TipoCupom } from "@models/cupom";
import { TipoEntrega } from "@models/pedido";
import { RequestState } from "@my-types/request";
import { transformPriceToString } from "@utils/transformation";
import {
  SubtotalText,
  TotalText,
  CoupomDataContainer,
  ColoredText,
} from "@components/shared/StyledComponents";

const CartCupom = dynamic(() => import("./CartCupom"));
import CartPayment from "./CartPayment";
import { CartFadeVariant } from "../animations";
import { CartFormErrorMessage, CartFormErrorContainer } from "./styled";

import type { CartFormValues } from "../FormModel";

type Props = {
  subTotalPrice: number;
  request: RequestState;
  onChangeRequestStatus: (status: Partial<RequestState>) => void;
  onChangeShouldShowConfirmation: (shouldShow: boolean) => void;
};

const CartLoggedOptions: React.FC<Props> = ({
  request,
  subTotalPrice,
  onChangeRequestStatus,
  onChangeShouldShowConfirmation,
}) => {
  const { validateForm, values, setFieldValue } = useFormikContext<CartFormValues>();
  const [formError, setFormError] = useState("");
  const [couponRequestStatus, changeCouponRequestStatus] = useRequestState();

  const isDelivery = values.deliveryType === TipoEntrega.ENTREGA;
  const shouldShowDeliveryPrice = isDelivery && values.coupon?.tipo_cupom !== TipoCupom.ENTREGA;
  const shouldShowDiscount = Boolean(values.coupon?.id_cupom);

  function getTotalPrice() {
    if (isDelivery && values.deliveryPrice) {
      if (values.coupon === null) {
        return subTotalPrice + values.deliveryPrice;
      }
      if (values.coupon?.tipo_cupom === TipoCupom.ENTREGA) {
        return subTotalPrice;
      }
      return (subTotalPrice * (100 - values.coupon.valor_desconto)) / 100 + values.deliveryPrice;
    }
    if (values.coupon && values.coupon.tipo_cupom === TipoCupom.PEDIDO) {
      return (subTotalPrice * (100 - values.coupon.valor_desconto)) / 100;
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

  function removeSelectedCupom() {
    setFieldValue("coupon", null);
  }

  useEffect(() => {
    setFormError("");
    onChangeRequestStatus({ error: "" });
  }, [values]);

  return (
    <Fragment>
      <AnimatePresence>
        {shouldShowDeliveryPrice && (
          <SubtotalText
            as={motion.p}
            variants={CartFadeVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            Entrega: <span>R$ {transformPriceToString(Number(values.deliveryPrice))}</span>
          </SubtotalText>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!Boolean(values.coupon) && (
          <CartCupom
            requestStatus={couponRequestStatus}
            onChangeRequestStatus={changeCouponRequestStatus}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shouldShowDiscount && (
          <CoupomDataContainer
            as={motion.div}
            variants={CartFadeVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <FaTrash cursor="pointer" size={16} color={PINK} onClick={removeSelectedCupom} />
            <ColoredText>
              Cupom: <span>{values.coupon?.codigo_cupom}</span>
            </ColoredText>
            <ColoredText>
              Desconto:{" "}
              {values.coupon?.tipo_cupom === TipoCupom.ENTREGA ? (
                <span> Frete grátis</span>
              ) : (
                <span>{values.coupon?.valor_desconto}%</span>
              )}
            </ColoredText>
            {values.coupon?.tipo_cupom === TipoCupom.PEDIDO && (
              <ColoredText>
                Valor:{" "}
                <span>
                  R$ {transformPriceToString((values.coupon.valor_desconto * subTotalPrice) / 100)}
                </span>
              </ColoredText>
            )}
          </CoupomDataContainer>
        )}
      </AnimatePresence>
      <CartPayment />
      <TotalText>
        Total: <span>R$ {transformPriceToString(getTotalPrice() || 0)}</span>
      </TotalText>
      <CartFormErrorContainer>
        {request.isLoading && <Loading />}
        {!request.isLoading && (
          <Fragment>
            {formError && <CartFormErrorMessage>{formError}</CartFormErrorMessage>}
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={finishOrderClickHandler}
            >
              Finalizar pedido
            </Button>
            {request.error && <CartFormErrorMessage>{request.error}</CartFormErrorMessage>}
          </Fragment>
        )}
      </CartFormErrorContainer>
    </Fragment>
  );
};

export default CartLoggedOptions;
