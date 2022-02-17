import React, { useContext } from "react";
import { PINK } from "@utils/colors";
import { CartContext } from "@store/cart";
import { FaTrash } from "react-icons/fa/index";
import { ItemDescriptionContainer, TrashPriceContainer, TrashPriceText } from "@components/shared/SharedStyledComponents";
import { transformPriceToString } from "@utils/transformation";

type Props = {
  productKey: string;
  quantity: number;
  productName: string;
  productSize: string | null;
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
    <ItemDescriptionContainer>
      <span>{quantity}x</span>{" "}
      {productSize !== null ? (
        <p>
          {productName} - {productSize}
        </p>
      ) : (
        <p>{productName}</p>
      )}
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
    </ItemDescriptionContainer>
  );
};

export default CartItemDescription;
