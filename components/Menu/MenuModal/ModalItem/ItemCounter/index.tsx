import Wrapper from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
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
        <FontAwesomeIcon icon={faMinusCircle} size="lg" color={PURPLE} />
      </button>
      <span>{props.quantity}</span>
      <button type="button" onClick={incrementHandler}>
        <FontAwesomeIcon icon={faPlusCircle} size="lg" color={PURPLE} />
      </button>
    </Wrapper>
  );
};

export default ItemCounter;
