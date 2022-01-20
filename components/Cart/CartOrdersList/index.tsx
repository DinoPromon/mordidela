import React from "react";

import { CartOrdersListContainer } from "./styled";
import CartOrder from "./CartOder";
import { CartProduct } from "@my-types/context";

type Props = {
  products: CartProduct[];
};

const CartOrdersList: React.FC<Props> = (props) => {
  const { products } = props;

  return (
    <CartOrdersListContainer>
      {products.map((product) => (
        <CartOrder product={product} key={product.key} />
      ))}
    </CartOrdersListContainer>
  );
};

export default CartOrdersList;
