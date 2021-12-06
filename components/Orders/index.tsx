import React from "react";

import Wrapper from "./styled";
import OrdersHistoryList from "./OrdersHistoryList";

const Orders: React.FC = (props) => {
  return (
    <Wrapper>
      <h1># PEDIDOS</h1>
      <OrdersHistoryList />
    </Wrapper>
  );
};

export default Orders;
