import React, { Fragment, useEffect, useState } from "react";
import { useFormikContext } from "formik";
import CartCupom from "./CartCupom";
import Entrega from "@models/entrega";
import CartPayment from "./CartPayment";
import Loading from "@components/shared/Loading";
import Axios from "@api";
import { CupomType } from "@constants/cupom-type";
import { CustomFade } from "@components/shared";
import { FormButton } from "@components/shared";
import { RequestState } from "@my-types/request";
import { CartFormValues } from "../FormModel";
import { CartFormSubtotalText } from "../styled";
import {
  CartFormErrorContainer,
  CartFormErrorMessage,
  CartFormTotalText,
  CartCoupomDataContainer,
  CartCupomData,
} from "./styled";
import { transformPriceToString } from "@utils/transformation";
import { FaTrash } from "react-icons/fa/index";
import { PINK } from "@utils/colors";

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
  const { validateForm, values, setFieldValue } = useFormikContext<CartFormValues>();
  const [formError, setFormError] = useState("");

  const isDelivery = values.delivery_type === CupomType.DELIVERY;
  const shouldShowDeliveryPrice = isDelivery && values.cupom?.tipo_cupom !== CupomType.DELIVERY;
  const shouldShowDiscount = Boolean(values.cupom?.valor_desconto);

  function getTotalPrice() {
    if (isDelivery && values.delivery_price) {
      if (values.cupom === null) {
        return subTotalPrice + values.delivery_price;
      }
      return (subTotalPrice * (100 - values.cupom.valor_desconto)) / 100 + values.delivery_price;
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
  }, [values]);

  useEffect(() => {
    let isMounted = true;
    async function getDeliveryPrice() {
      try {
        const { data } = await Axios.get<{ preco_entrega: Entrega["preco_entrega"] }>(
          `/address/delivery_price/${values.address_id}`
        );
        if (isMounted) {
          setFieldValue("delivery_price", data.preco_entrega);
        }
      } catch (e) {
        const error = e as Error;
        console.log(error);
      }
    }
    if (values.address_id) {
      getDeliveryPrice();
    }

    return () => {
      isMounted = false;
    };
  }, [values.address_id, setFieldValue]);

  return (
    <Fragment>
      <CustomFade triggerAnimation={shouldShowDeliveryPrice}>
        <CartFormSubtotalText>
          Entrega: <span>R$ {transformPriceToString(Number(values.delivery_price))}</span>
        </CartFormSubtotalText>
      </CustomFade>
      <CartCupom />

      <CustomFade triggerAnimation={values.cupom?.tipo_cupom === CupomType.DELIVERY}>
        <CartFormSubtotalText>Desconto de entrega aplicado</CartFormSubtotalText>
      </CustomFade>

      <CustomFade triggerAnimation={shouldShowDiscount}>
        <CartCoupomDataContainer>
          <CartCupomData>
            <FaTrash cursor="pointer" size={16} color={PINK} />
          </CartCupomData>
          <CartCupomData>
            Cupom: <span>{values.cupom?.codigo_cupom}</span>
          </CartCupomData>
          <CartCupomData>
            Desconto: <span>{values.cupom?.valor_desconto}%</span>
          </CartCupomData>
        </CartCoupomDataContainer>
      </CustomFade>

      <CartPayment />
      <CartFormTotalText>
        Total: <span>R$ {transformPriceToString(getTotalPrice())}</span>
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
