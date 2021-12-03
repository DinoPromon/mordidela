import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Wrapper from "./styled";
import { PINK } from "@utils/colors";
import { CartContext } from "@store/cart";
import { transformPriceToString } from "@utils/transformation";

type Props = {
  productKey: string;
  quantity: number;
  productName: string;
  productSize: string;
  standard_price: number;
};

const CartItemDescription: React.FC<Props> = (props) => {
  const { quantity, productName, productSize, standard_price, productKey } = props;
  const { removeProductFromCart } = useContext(CartContext);

  function removeProductHandler() {
    removeProductFromCart(productKey);
  }

  return (
    <Wrapper>
      <span>{quantity}x</span>
      <p>
        {productName} - {productSize}
      </p>
      <div>
        <span>
          <FontAwesomeIcon icon={faTrash} size="sm" color={PINK} onClick={removeProductHandler} />
        </span>
        <p>R$ {transformPriceToString(standard_price)}</p>
      </div>
    </Wrapper>
  );
};

export default CartItemDescription;
