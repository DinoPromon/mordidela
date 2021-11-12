import React from "react";

// import Batata from "@images/caixa-batata.png";
import Item from "./styled";
import ItemImage from "./ItemImage";
import ItemDescription from "./ItemDescription";

type Props = {
  onClick: () => void;
}

const MenuItem: React.FC<Props> = (props) => {

  const clickHandler = () => {
    props.onClick();
  };

  return (
    <Item onClick={clickHandler}>
      <ItemImage src="/images/caixa-batata.png" alt="Caixa de batata"/>
      <ItemDescription />
    </Item>
  );
};

export default MenuItem;
