import React, { useContext, Fragment } from "react";

import Wrapper from "./styled";
import useFadeAnimation from "@hooks/useFadeAnimation";
import { CartContext } from "@store/cart";
import { formatPrice } from "@utils/formatters";
import { transformPriceToString, transformPriceStringToNumber } from "@utils/transformation";

type Props = {
  totalPrice: number;
  shouldShowPaymentValue: boolean;
};

const CartPaymentValue: React.FC<Props> = (props) => {
  const { setPaymentAmount, order } = useContext(CartContext);
  const showComponent = useFadeAnimation(props.shouldShowPaymentValue);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    event.target.value = formatPrice(value);
    setPaymentAmount(transformPriceStringToNumber(event.target.value));
  }

  return (
    <Fragment>
      {showComponent && (
        <Wrapper shouldShowComponent={props.shouldShowPaymentValue}>
          <h3>Precisa de troco para quanto?</h3>
          <div>
            <span>R$</span>
            <input
              type="text"
              maxLength={7}
              onChange={changeHandler}
              value={transformPriceToString((order.payment_amount as number) || 0)}
            ></input>
          </div>
        </Wrapper>
      )}
    </Fragment>
  );
};

export default CartPaymentValue;
