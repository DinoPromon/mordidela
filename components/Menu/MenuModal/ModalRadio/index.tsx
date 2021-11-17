import React from "react";
import Wrapper from "./styled";

const ModalRadio: React.FC = () => {
  return (
    <Wrapper>
        <label htmlFor="caixa-media">Caixa média - 600g
            <input type="radio" id="caixa-media" name="input-tamanho" checked/>
            <span></span>
            <p>R$ 20,90</p>
        </label>

        <label htmlFor="caixa-grande">Caixa grande - 1kg
            <input type="radio" id="caixa-grande" name="input-tamanho"/>
            <span></span>
            <p>R$ 32,00</p>
        </label>
    </Wrapper>
  );
};

export default ModalRadio;