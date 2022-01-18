import React from "react";

import Item from "./styled";
import { ViewPedidoForClient } from "@models/views";
import Wrapper from "@components/Account/AccountModal/UserOrders/OrdersList/OrderItem/styled";

type Props = {
  orderData: ViewPedidoForClient;
};

const OrderItem = () => {
  return (
    <Wrapper>
      <h2>Pedido 12 - 10/01/2022</h2>
      <h3>
        Status: <span>pendente</span>
      </h3>
      <p>+ detalhes</p>
      <span>R$ 32,50</span>
    </Wrapper>
  );
};

export default OrderItem;
