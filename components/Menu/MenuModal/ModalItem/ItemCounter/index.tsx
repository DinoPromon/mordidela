import React from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

import { PURPLE } from "@utils/colors";

import { ItemCounterContainer, CounterButton } from "./styled";

type Props = {
  quantity: number;
  setQuantity: (quantity: number) => void;
};

const ItemCounter: React.FC<Props> = (props) => {
  const { quantity, setQuantity } = props;

  function decrementHandler() {
    quantity > 1 && setQuantity(quantity - 1);
  }

  function incrementHandler() {
    setQuantity(quantity + 1);
  }

  return (
    <ItemCounterContainer>
      <CounterButton type="button" onClick={decrementHandler}>
        <AiOutlineMinusCircle color={PURPLE} size={24} style={{ verticalAlign: "middle" }} />
      </CounterButton>
      <span>{props.quantity}</span>
      <CounterButton type="button" onClick={incrementHandler}>
        <AiOutlinePlusCircle color={PURPLE} size={24} style={{ verticalAlign: "middle" }} />
      </CounterButton>
    </ItemCounterContainer>
  );
};

export default ItemCounter;
