import React from "react";
import Wrapper from "./styled";

const ModalCheckboxAdicional: React.FC = () => {
  return (
    <Wrapper>
      <label htmlFor="barbecue">Barbecue
        <input type="checkbox" id="barbecue" name="input-barbecue"></input>
        <span></span>
        <p>R$ 2,00</p>
      </label>
      <label htmlFor="mostarda-e-mel">Mostarda e mel
        <input type="checkbox" id="mostarda-e-mel" name="input-mostarda-e-mel"></input>
        <span></span>
        <p>R$ 2,00</p>
      </label>
      <label htmlFor="cheddar-cremoso">Cheddar cremoso
        <input type="checkbox" id="cheddar-cremoso" name="input-cheddar-cremoso"></input>
        <span></span>
        <p>R$ 2,00</p>
      </label>
      <label htmlFor="maionese-verde">Maionese verde
        <input type="checkbox" id="maionese-verde" name="input-maionese-verde"></input>
        <span></span>
        <p>R$ 2,00</p>
      </label>
      <label htmlFor="cheddar-cremoso-bacon">Cheddar cremoso + bacon
        <input type="checkbox" id="cheddar-cremoso-bacon" name="input-cheddar-cremoso-bacon"></input>
        <span></span>
        <p>R$ 2,00</p>
      </label>
      <label htmlFor="pimenta">Pimenta
        <input type="checkbox" id="pimenta" name="input-pimenta"></input>
        <span></span>
        <p>R$ 2,00</p>
      </label>
    </Wrapper>
  );
};

export default ModalCheckboxAdicional;