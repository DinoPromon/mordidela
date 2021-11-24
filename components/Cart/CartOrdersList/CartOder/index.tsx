import React from "react";

import ListItem from "./styled";
import CartItemDescription from "./CartItemDescription";
import CartOrderAdds from "./CartOrderAdds";

const CartOrder: React.FC = () => {
  return (
    <ListItem>
      <CartItemDescription />
      <CartOrderAdds />
    </ListItem>
  );
};

export default CartOrder;
