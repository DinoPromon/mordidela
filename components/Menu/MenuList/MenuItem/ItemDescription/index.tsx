import React from "react";

import Wrapper from "./styled";

const ItemDescription: React.FC = (props) => {
  return (
    <Wrapper>
      <span>CAIXA DE BATATA</span>
      <span>R$ 10,90</span>
    </Wrapper>
  );
};

export default ItemDescription;