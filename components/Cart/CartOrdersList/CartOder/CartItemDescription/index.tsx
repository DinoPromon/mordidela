import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { PINK } from "@utils/colors";
import React from "react";

import Wrapper from "./styled";
import { transformPriceToString } from "@utils/transformation/price";

type Props = {
  quantity: number;
  productName: string;
  productSize: string;
  standard_price: number;
};

const CartItemDescription: React.FC<Props> = (props) => {
  const { quantity, productName, productSize, standard_price } = props;

  return (
    <Wrapper>
      <span>{quantity}x</span>
      <h2>
        {productName} - {productSize}
      </h2>
      <div>
        <span>
          <FontAwesomeIcon icon={faTrash} size="sm" color={PINK} />
        </span>
        <p>R$ {transformPriceToString(standard_price)}</p>
      </div>
    </Wrapper>
  );
};

export default CartItemDescription;
