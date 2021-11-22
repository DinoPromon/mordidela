import Wrapper from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { PURPLE } from "@utils/colors";
import React from "react";

type Props = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const ItemCounter: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <button type="button" onClick={props.onDecrement}>
        <FontAwesomeIcon icon={faMinusCircle} size="lg" color={PURPLE} />
      </button>
      <span>{props.quantity}</span>
      <button type="button" onClick={props.onIncrement}>
        <FontAwesomeIcon icon={faPlusCircle} size="lg" color={PURPLE} />
      </button>
    </Wrapper>
  );
};

export default ItemCounter;
