import React from "react";

import Wrapper from "./styled";

const CartSubtotal: React.FC = () => {
  return (
    <Wrapper>
        <div>
            <h2>Subtotal:</h2>
            <span>R$ 26,90</span>
        </div>
    </Wrapper>
  );
};

export default CartSubtotal;
