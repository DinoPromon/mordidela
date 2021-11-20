import React from "react";

import Wrapper from "./styled";

const CartAdicionalDescription: React.FC = () => {
  return (
    <Wrapper>
        <div>
            <p>Adicional: Barbecue</p>
            <span>R$ 2,00</span>
        </div>
        <div>
            <p>Adicional: Mostarda e mel</p>
            <span>R$ 2,00</span>
        </div>
        <div>
            <p>Adicional: Cheddar cremoso</p>
            <span>R$ 2,00</span>
        </div>
    </Wrapper>
  );
};

export default CartAdicionalDescription;
