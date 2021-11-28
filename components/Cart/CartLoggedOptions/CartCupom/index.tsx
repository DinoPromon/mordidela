import { FormButton } from "@components/shared";
import React from "react";

import Wrapper from "./styled";
import { cupomFormat } from "@utils/formatters/input-formatter";

const CartCupom: React.FC = () => {
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    event.target.value = cupomFormat(event.target.value);
  }
  return (
    <Wrapper>
      <input type="text" placeholder="Digite aqui seu cupom" onChange={changeHandler} />
      <FormButton>Adicionar</FormButton>
    </Wrapper>
  );
};

export default CartCupom;
