import { FormButton } from "@components/shared";
import React from "react";

import Wrapper from "./styled";

const CartCupom: React.FC = () => {
  return (
    <Wrapper>
        <div>
            <input type="text" placeholder="Digite aqui seu cupom" />
            <FormButton>Adicionar</FormButton>
        </div>
    </Wrapper>
  );
};

export default CartCupom;
