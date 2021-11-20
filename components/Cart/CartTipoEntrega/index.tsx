import React from "react";

import Wrapper from "./styled";

const CartTipoEntrega: React.FC = () => {
  return (
    <Wrapper>
        <div>
            <label htmlFor="delivery">Delivery
                <input type="radio" id="delivery" name="input-tipo-entrega"/>
                <span></span>
            </label>
            <label htmlFor="balcao">Balcão
                <input type="radio" id="balcao" name="input-tipo-entrega"/>
                <span></span>
            </label>
        </div>
    </Wrapper>
  );
};

export default CartTipoEntrega;
