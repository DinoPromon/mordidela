import React from "react";

import Item from "./styled";
import { ViewPedidoForClient } from "@models/views";
import { transformPriceToString } from "@utils/transformation";
import { transformDateFromDBToClient } from "@utils/transformation";

type Props = {
  orderData: ViewPedidoForClient;
};

const OrderItem: React.FC<Props> = (props) => {
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
};

export default OrderItem;
