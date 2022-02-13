import React from "react";
import { PageContainer, PageTitle } from "@components/shared";
import { OrdersContainer } from "./styled";

const Orders: React.FC = () => {
  return (
    <PageContainer>
      <PageTitle>Pedidos</PageTitle>
      <OrdersContainer>
        <p>Pedido 1425 - 11/02/2021 às 22:05</p>
        <p>Status: pendente</p>
        <p>Total: R$ 23,50</p>
      </OrdersContainer>
    </PageContainer>
  );
};

export default Orders;
