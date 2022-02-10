import React, { useContext } from "react";
import { CartItemDescriptionContainer, TrashPriceContainer, TrashPriceText } from "./styled";
import { PINK } from "@utils/colors";
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
      <TrashPriceContainer>
        <FaTrash
          cursor="pointer"
          size={16}
          color={PINK}
          onClick={removeProductHandler}
          style={{ verticalAlign: "middle" }}
        />
        <TrashPriceText>R$ {transformPriceToString(standard_price)}</TrashPriceText>
      </TrashPriceContainer>
    </CartItemDescriptionContainer>
  );
};

export default CartItemDescription;
