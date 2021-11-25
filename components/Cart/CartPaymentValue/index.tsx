
import React from "react";

import Wrapper from "./styled";

const CartPaymentValue: React.FC = () => {
  return (
    <Wrapper>
        <h3>Precisa de troco para quanto?</h3>
        <div>
            <span>R$</span>
            <input type="text"></input>
        </div>
    </Wrapper>
  );
};

export default CartPaymentValue;