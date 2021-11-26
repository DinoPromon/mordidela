import React from "react";

import Wrapper from "./styled";
import Adicional from '@models/adicional';
import { transformPriceToString } from "@utils/transformation/price";

type Props = {
  adds: Adicional[];
};

const CartOrderAdds: React.FC<Props> = (props) => {
  const { adds } = props;

  return (
    <Wrapper>
      {adds.map((add) => (
        <p key={`add-${add.id_adicional}`}>
          Adicional: {add.nome} <span>R$ {transformPriceToString(add.preco)}</span>
        </p>
      ))}
    </Wrapper>
  );
};

export default CartOrderAdds;
