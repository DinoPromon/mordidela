import React from "react";

import Item from "./styled";
import { ViewPedidoForClient } from "@models/views";
import { transformPriceToString } from "@utils/transformation";
import { transformDateFromDBToClient } from "@utils/transformation";
import Wrapper from "@components/Account/AccountModal/UserOrders/OrdersList/OrderItem/styled"

type Props = {
  orderData: ViewPedidoForClient;
};

/* const OrderItem: React.FC<Props> = (props) => {
  const { orderData: order } = props;

  return (
    <Item statusPedido={order.status_pedido}>
      <ul>
        <li>{transformDateFromDBToClient(order.data_pedido)}</li>
        <li>{order.status_pedido}</li>
        <li>R$ {transformPriceToString(order.valor_total)}</li>
        <li>+</li>
      </ul>
    </Item>
  );
}; */

const OrderItem = () => {
  return(
    <Wrapper>
      <h2>Pedido 12 - 10/01/2022</h2>
      <h3>Status: <span>pendente</span></h3>
      <p>+ detalhes</p>
      <span>R$ 32,50</span>
    </Wrapper>
  );
};

export default OrderItem;
