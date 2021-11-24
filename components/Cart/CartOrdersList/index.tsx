import React from "react";

import CustomList from './styled';
import CartOrder from "./CartOder";

const CartOrdersList: React.FC = () => {
  return (
    <CustomList>
      <CartOrder />
    </CustomList>
  );
};

export default CartOrdersList;