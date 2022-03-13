import React from "react";
import { useFormikContext } from "formik";
import { AnimatePresence, motion } from "framer-motion";

import { CartFadeVariant } from "@components/Cart/animations";
import { formatCurrency } from "@utils/formatters";

import { CartPaymentValueContainer, CartPaymentInputChange } from "./styled";

import type { CartFormValues } from "@components/Cart/FormModel";

type Props = {
  shouldShowPaymentValue: boolean;
};

const CartPaymentValue: React.FC<Props> = ({ shouldShowPaymentValue }) => {
  const { setFieldValue, values } = useFormikContext<CartFormValues>();

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setFieldValue("paymentAmount", formatCurrency(value));
  }

  return (
    <AnimatePresence>
      {shouldShowPaymentValue && (
        <CartPaymentValueContainer
          as={motion.div}
          variants={CartFadeVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <h4>Precisa de troco para quanto?</h4>
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
      )}
    </AnimatePresence>
  );
};

export default CartPaymentValue;
