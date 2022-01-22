import React, { useContext } from "react";
import { CartItemDescriptionContainer, CartItemDescriptionTrashPrice } from "./styled";
import { PINK, PURPLE } from "@utils/colors";
import { CartContext } from "@store/cart";
import { FaTrash } from "react-icons/fa/index";
import { transformPriceToString } from "@utils/transformation";

type Props = {
  productKey: string;
  quantity: number;
  productName: string;
  productSize: string;
  standard_price: number;
};

const CartItemDescription: React.FC<Props> = ({
  quantity,
  productKey,
  productName,
  productSize,
  standard_price,
}) => {
  const { removeProductFromCart } = useContext(CartContext);

  function removeProductHandler() {
    removeProductFromCart(productKey);
  }

  return (
    <CartItemDescriptionContainer>
      <span>{quantity}x</span>
      <p>
        {productName} - {productSize}
      </p>
      <CartItemDescriptionTrashPrice>
        <FaTrash
          cursor="pointer"
          size={16}
          color={PINK}
          onClick={removeProductHandler}
          style={{ verticalAlign: "middle" }}
        />
        <p>R$ {transformPriceToString(standard_price)}</p>
      </CartItemDescriptionTrashPrice>
    </CartItemDescriptionContainer>
  );
};

export default CartItemDescription;
