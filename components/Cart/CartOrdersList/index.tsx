import React from "react";

import CustomList from "./styled";
import CartOrder from "./CartOder";
import { CartProduct } from "@my-types/context";

type Props = {
  products: CartProduct[];
};

const CartOrdersList: React.FC<Props> = (props) => {
  const { products } = props;

  return (
    <CustomList>
      {products.map((product) => (
        <CartOrder product={product} key={product.key} />
      ))}
    </CustomList>
  );
};

export default CartOrdersList;
