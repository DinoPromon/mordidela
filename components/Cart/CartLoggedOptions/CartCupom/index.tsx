import React, { useState, useContext } from "react";

import { CartCupomContainer, CartCupomInput } from "./styled";
import { CartContext } from "@store/cart";
import { FormButton } from "@components/shared";
import { cupomFormat } from "@utils/formatters";
import Cupom from "@models/cupom";

const CartCupom: React.FC = () => {
  const { setCupom, order } = useContext(CartContext);
  const [inputCupom, setInputCupom] = useState(cupomFormat(order.codigo_cupom || ""));

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setInputCupom(cupomFormat(event.target.value));
  }

  async function getCupom() {
    const response = await fetch(`/api/cupom?codigo=${inputCupom}`);
    const { cupom } = (await response.json()) as { cupom: Cupom };
    if (cupom) setCupom(cupom);
  }

  function addCupomClickHandler() {
    getCupom();
  }

  return (
    <CartCupomContainer>
      <CartCupomInput
        type="text"
        placeholder="Digite aqui seu cupom"
        onChange={changeHandler}
        maxLength={20}
        value={inputCupom}
      />
      <FormButton type="button" onClick={addCupomClickHandler}>
        Adicionar
      </FormButton>
    </CartCupomContainer>
  );
};

export default CartCupom;
