import { InputRadio } from "@components/shared";
import React from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Wrapper from "./styled";
import { PURPLE } from "@utils/colors";

const CartAddress = () => {
  return (
    <Wrapper>
      <h3>Endereço de entrega</h3>
      <InputRadio>
        <p>Rua dos Alfeneiros n° 4, Little Whinging</p>
      </InputRadio>
      <div>
        <p>Complemento: Casa</p>
      </div>
      <div className="adicionar_endereco">
        <span><FontAwesomeIcon icon={faPlusCircle} size="sm" color={PURPLE}/></span>
        <p>Adicionar endereço</p>
      </div>
    </Wrapper>
  );
};

export default CartAddress;