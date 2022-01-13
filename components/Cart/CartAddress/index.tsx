import { InputRadio } from "@components/shared";
import React from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CartAddressContainer, CartAddAddress } from "./styled";
import { PURPLE } from "@utils/colors";

const CartAddress = () => {
  return (
/*     <Wrapper>
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
    </Wrapper> */
    <CartAddressContainer>
      <h2>Endereço de entrega</h2>
      <InputRadio>
        Rua dos Alfeneiros n° 4, Little Whinging
      </InputRadio>
      <p>Complemento: Casa</p>
      <CartAddAddress>
        <FontAwesomeIcon icon={faPlusCircle} size="sm" color={PURPLE}/>
        <p>Adicionar endereço</p>
      </CartAddAddress>
    </CartAddressContainer>
  );
};

export default CartAddress;
