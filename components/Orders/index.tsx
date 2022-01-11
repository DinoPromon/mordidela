import React from "react";

import { Wrapper, Titulo } from "./styled";
import OrdersHistoryList from "./OrdersHistoryList";

const Orders: React.FC = (props) => {
  return (
    <Wrapper>
      <Titulo>PEDIDOS</Titulo>
      <OrdersHistoryList />
    </Wrapper>
  );
};

export default Orders;
