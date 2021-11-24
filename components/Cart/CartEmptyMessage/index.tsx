import React from "react";

import Wrapper from './styled';

const CartEmptyMessage = () => {
  return (
    <Wrapper>
      <span>Carrinho Vazio.</span>
      {/* <p>Escolha nossos produtos clicando <span>aqui</span>.</p> */}
    </Wrapper>
  );
};

export default CartEmptyMessage;