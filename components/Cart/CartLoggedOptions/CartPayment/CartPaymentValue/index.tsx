import React, { Fragment } from "react";
import { useFormikContext } from "formik";
import { CustomFade } from "@components/shared";
import { formatPrice } from "@utils/formatters";
import { CartPaymentValueContainer, CartPaymentInputChange } from "./styled";

import type { CartFormValues } from "@components/Cart/FormModel";

type Props = {
  shouldShowPaymentValue: boolean;
};

const CartPaymentValue: React.FC<Props> = ({ shouldShowPaymentValue }) => {
  const { setFieldValue, values } = useFormikContext<CartFormValues>();

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setFieldValue("payment_amount", formatPrice(value));
  }

  return (
    <Fragment>
      <CustomFade triggerAnimation={shouldShowPaymentValue}>
        <CartPaymentValueContainer>
          <h3>Precisa de troco para quanto?</h3>
          <CartPaymentInputChange>
            <span>R$</span>
            <input
              type="text"
              maxLength={7}
              onChange={changeHandler}
              value={values.paymentAmount}
            ></input>
          </CartPaymentInputChange>
        </CartPaymentValueContainer>
      </CustomFade>
    </Fragment>
  );
};

export default CartPaymentValue;
