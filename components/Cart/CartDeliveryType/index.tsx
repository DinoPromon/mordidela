import React from "react";

import Wrapper from "./styled";

const CartDeliveryType: React.FC = () => {
  return (
    <Wrapper>
      <label htmlFor="entrega">
        Delivery
        <input type="radio" id="entrega" name="input-tipo-entrega" value="entrega" defaultChecked={true} />
        <span></span>
      </label>
      <label htmlFor="balcao">
        Balcão
        <input type="radio" id="balcao" name="input-tipo-entrega" value="balcao" />
        <span></span>
      </label>
    </Wrapper>
  );
};

export default CartDeliveryType;
