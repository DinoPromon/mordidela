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

  function getFlavorsAsString() {
    let string = "";
    for (let i = 0; i < product.flavors.length - 1; i++) {
      string += `${product.flavors[i].nome}, `;
    }
    string += `${product.flavors[product.flavors.length - 1].nome}.`;
    return string;
  }

  return (
    <ListItem>
      <CartItemDescription
        standard_price={product.standard_price}
        productName={product.name}
        productSize={product.size}
        quantity={product.quantity}
      />
      <div>
        <CartOrderAdds adds={product.adds} />
        {!!product.flavors.length && <p>Sabores: {getFlavorsAsString()}</p>}
      </div>
    </ListItem>
  );
};

export default CartOrder;
