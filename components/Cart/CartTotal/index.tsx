import React from "react";

import Wrapper from "./styled";

const CartTotal: React.FC = () => {
  return (
    <Wrapper>
        <div>
            <h2>Total:</h2>
            <span>R$ 30,40</span>
        </div>
    </Wrapper>
  );
};

export default CartTotal;
