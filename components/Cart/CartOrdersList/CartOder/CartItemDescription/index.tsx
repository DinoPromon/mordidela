import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { PURPLE, PINK } from "@utils/colors";
import React from "react";

import Wrapper from "./styled";

const CartItemDescription: React.FC = () => {
  return (
    <Wrapper>
      <span>1x</span>
      <h2>Caixa de batata</h2>
      <div>
        <span>
          <FontAwesomeIcon icon={faTrash} size="sm" color={PINK} />
        </span>
        <p>R$ 20,90</p>
      </div>
    </Wrapper>
  );
};

export default CartItemDescription;
