import React from "react";

import Wrapper from "./styled";

type Props = {
  nome: string
}

const ItemDescription: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <span>{props.nome.toLocaleUpperCase()}</span>
      <span>R$5,90 - R$10,90</span>
    </Wrapper>
  );
};

export default ItemDescription;