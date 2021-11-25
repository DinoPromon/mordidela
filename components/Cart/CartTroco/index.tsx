
import React from "react";

import Wrapper from "./styled";

const CartTroco: React.FC = () => {
  return (
    <Wrapper>
      <h3>Precisa de troco? </h3>
      <label htmlFor="nao">
        Não
        <input type="radio" id="nao" name="input-tipo-troco" value="nao" />
        <span></span>
      </label>
      <label htmlFor="sim">
        Sim
        <input type="radio" id="sim" name="input-tipo-troco" value="sim" />
        <span></span>
      </label>
    </Wrapper>
  );
};

export default CartTroco;