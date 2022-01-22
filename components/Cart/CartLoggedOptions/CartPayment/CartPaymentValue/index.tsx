import React, { useContext, Fragment } from "react";
import { useFormikContext } from "formik";
import { CartFormValues } from "@components/Cart";
import { CartPaymentValueContainer, CartPaymentInputChange } from "./styled";
import { CustomFade } from "@components/shared";
import { CartContext } from "@store/cart";
import { formatPrice } from "@utils/formatters";
import { transformPriceToString, transformPriceStringToNumber } from "@utils/transformation";

type Props = {
  shouldShowPaymentValue: boolean;
};

const CartPaymentValue: React.FC<Props> = ({ shouldShowPaymentValue }) => {
  const { setFieldValue } = useFormikContext<CartFormValues>();
  const { setPaymentAmount, order } = useContext(CartContext);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    event.target.value = formatPrice(value);
    setFieldValue("payment_amount", event.target.value);
    setPaymentAmount(transformPriceStringToNumber(event.target.value));
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
              value={transformPriceToString(Number(order.payment_amount))}
            ></input>
          </CartPaymentInputChange>
        </CartPaymentValueContainer>
      </CustomFade>
    </Fragment>
  );
};

export default CartPaymentValue;
