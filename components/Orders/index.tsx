import React from "react";

import { OrdersContainer, OrdersTitle } from "./styled";
import OrdersHistoryList from "./OrdersHistoryList";
import { PageContainer } from "@components/shared";

const Orders: React.FC = (props) => {
  return (
    <PageContainer>
      <OrdersTitle>Pedidos</OrdersTitle>
      <OrdersHistoryList />
    </PageContainer>
  );
};

export default Orders;
