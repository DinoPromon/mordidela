import React, { useContext } from "react";

import Wrapper from "./styled";
import { CartContext } from "@store/cart";
import { formatPrice } from "@utils/formatters";
import { transformPriceStringToNumber, transformPriceToString } from "@utils/transformation/price";

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

  return (
    <Wrapper>
      <h3>Precisa de troco para quanto?</h3>
      <div>
        <span>R$</span>
        <input
          type="text"
          maxLength={7}
          onChange={changeHandler}
          value={transformPriceToString(order.payment_amount as number || 0)}
        ></input>
      </div>
    </Wrapper>
  );
};

export default CartPaymentValue;
