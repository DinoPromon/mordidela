import React from "react";

// import Batata from "@images/caixa-batata.png";
import Item from "./styled";
import ItemImage from "./ItemImage";
import ItemDescription from "./ItemDescription";

const MenuItem: React.FC = () => {
  return (
    <Item>
      <ItemImage src="/images/caixa-batata.png" alt="Caixa de batata"/>
      <ItemDescription />
    </Item>
  );
};

export default MenuItem;
