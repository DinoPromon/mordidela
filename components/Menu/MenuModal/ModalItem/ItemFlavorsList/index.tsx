import React from "react";
import Wrapper from "./styled";

const ItemFlavorsList: React.FC = () => {
  return (
    <Wrapper>
      <h3>Sabores</h3>
      <label htmlFor="nenhum-sabor">
        Nenhum sabor para selecionar
        <input type="checkbox" id="nenhum-sabor" name="input-sabor"></input>
        <span></span>
      </label>
    </Wrapper>
  );
};

export default ItemFlavorsList;
