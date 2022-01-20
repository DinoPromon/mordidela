import React from "react";

import { CartOrderAddsContainer } from "./styled";
import Adicional from "@models/adicional";
import { transformPriceToString } from "@utils/transformation";

type Props = {
  adds: Adicional[];
};

const CartOrderAdds: React.FC<Props> = (props) => {
  const { adds } = props;

  return (
    <CartOrderAddsContainer>
      {adds.map((add) => (
        <p key={`add-${add.id_adicional}`}>
          Adicional: {add.nome}{" "}
          <span>R$ {transformPriceToString(add.preco)}</span>
        </p>
      ))}
    </CartOrderAddsContainer>
  );
};

export default CartOrderAdds;
