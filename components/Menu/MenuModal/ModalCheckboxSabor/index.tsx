import React from "react";
import Wrapper from "./styled";

const ModalCheckboxSabor: React.FC = () => {
  return (
    <Wrapper>
      <label htmlFor="nenhum-sabor">
        Nenhum sabor para selecionar
        <input type="checkbox" id="nenhum-sabor" name="input-sabor"></input>
        <span></span>
      </label>
    </Wrapper>
  );
};

export default ModalCheckboxSabor;
