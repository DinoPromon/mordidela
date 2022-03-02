import React, { useContext } from "react";
import { PINK } from "@utils/colors";
import { CartContext } from "@store/cart";
import { FaTrash } from "react-icons/fa/index";
import {
  ItemDescriptionContainer,
  TrashPriceContainer,
  TrashPriceText,
} from "@components/shared/SharedStyledComponents";
import { transformPriceToString } from "@utils/transformation";

type Props = {
  productKey: string;
  quantity: number;
  productName: string;
  productSize: string | null;
  standardPrice: number;
};

const CartItemDescription: React.FC<Props> = ({
  quantity,
  productKey,
  productName,
  productSize,
  standardPrice,
}) => {
  const { removeProductFromCart } = useContext(CartContext);

  function removeProductHandler() {
    removeProductFromCart(productKey);
  }

  function getProductName() {
    if (!productSize) return productName;

    return `${productName} - ${productSize}`;
  }

  return (
    <ItemDescriptionContainer>
      <span>{quantity}x</span> <p>{getProductName()}</p>
      <TrashPriceContainer>
        <FaTrash
          cursor="pointer"
          size={16}
          color={PINK}
          onClick={removeProductHandler}
          style={{ verticalAlign: "middle" }}
        />
        <TrashPriceText>R$ {transformPriceToString(standardPrice)}</TrashPriceText>
      </TrashPriceContainer>
    </ItemDescriptionContainer>
  );
};

export default CartItemDescription;
