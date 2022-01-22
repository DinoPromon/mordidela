import React, { useContext, Fragment } from "react";
import { useFormikContext } from "formik";
import { CartFormValues } from "@components/Cart";
import { CartPaymentValueContainer, CartPaymentInputChange } from "./styled";
import useFadeAnimation from "@hooks/useFadeAnimation";
import { CartContext } from "@store/cart";
import { formatPrice } from "@utils/formatters";
import { transformPriceToString, transformPriceStringToNumber } from "@utils/transformation";

type Props = {
  shouldShowPaymentValue: boolean;
};

const CartPaymentValue: React.FC<Props> = ({ shouldShowPaymentValue }) => {
  const { setFieldValue } = useFormikContext<CartFormValues>();
  const { setPaymentAmount, order } = useContext(CartContext);
  const showComponent = useFadeAnimation(shouldShowPaymentValue);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    event.target.value = formatPrice(value);
    setFieldValue("payment_amount", event.target.value);
    setPaymentAmount(transformPriceStringToNumber(event.target.value));
  }

  return (
    <Fragment>
      {showComponent && (
        <CartPaymentValueContainer shouldShowComponent={shouldShowPaymentValue}>
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
      )}
    </Fragment>
  );
};

export default CartPaymentValue;
