import React, { useContext } from "react";

import Wrapper from "./styled";
import { CartContext } from "@store/cart";
import { formatPrice } from "@utils/formatters/input-formatter";
import { transformPriceStringToNumber } from "@utils/transformation/price";

type Props = {
  totalPrice: number;
};

const CartPaymentValue: React.FC<Props> = (props) => {
  const { setPaymentAmount, order } = useContext(CartContext);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    event.target.value = formatPrice(value);
    setPaymentAmount(transformPriceStringToNumber(event.target.value));
  }

  const paymentAmount = order?.payment_amount as number;

  return (
    <Wrapper>
      <h3>Precisa de troco para quanto?</h3>
      <div>
        <span>R$</span>
        <input type="text" maxLength={7} onChange={changeHandler}></input>
        {paymentAmount < props.totalPrice && <p>Valor inválido.</p>}
      </div>
    </Wrapper>
  );
};

export default CartPaymentValue;
