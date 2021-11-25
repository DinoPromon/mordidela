import React from "react";

import ListItem from "./styled";
import CartItemDescription from "./CartItemDescription";
import CartOrderAdds from "./CartOrderAdds";
import { CartProduct } from "@my-types/context";

type Props = {
  product: CartProduct;
};

const CartOrder: React.FC<Props> = (props) => {
  const { product } = props;

  return (
    <ListItem>
      <CartItemDescription
        standard_price={product.standard_price}
        productName={product.name}
        productSize={product.size}
        quantity={product.quantity}
      />
      <CartOrderAdds adds={product.adds}/>
    </ListItem>
  );
};

export default CartOrder;
