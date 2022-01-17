import Wrapper from "./styled";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai/index";
import { PURPLE } from "@utils/colors";
import React from "react";

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
    <Wrapper>
      <button type="button" onClick={decrementHandler}>
        <AiOutlineMinusCircle color={PURPLE} size={24} style={{ verticalAlign: "middle" }} />
      </button>
      <span>{props.quantity}</span>
      <button type="button" onClick={incrementHandler}>
        <AiOutlinePlusCircle color={PURPLE} size={24} style={{ verticalAlign: "middle" }} />
      </button>
    </Wrapper>
  );
};

export default ItemCounter;
