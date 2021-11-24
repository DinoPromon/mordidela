import React from "react";

import Wrapper from "./styled";

const CartOrderAdds: React.FC = () => {
  return (
    <Wrapper>
      <p>
        Adicional: Barbecue <span>R$ 2,00</span>
      </p>
      <p>
        Adicional: Mostarda e mel <span>R$ 2,00</span>
      </p>

      <p>
        Adicional: Cheddar cremoso <span>R$ 2,00</span>
      </p>
    </Wrapper>
  );
};

export default CartOrderAdds;
