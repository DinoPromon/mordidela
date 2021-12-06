import { ViewPedidoForClient } from "@models/views";
import React from "react";

import Item from "./styled";
import {
  transformPriceToString,
  transformDateFromDBToClient,
  transformDeliveryType,
  getHourFromDate,
  toCamelCase,
} from "@utils/transformation";

type Props = {
  order: ViewPedidoForClient;
};

const OrderHistory: React.FC<Props> = (props) => {
  const { order } = props;

  return (
    <Item>
      <p>
        Pedido <span>Nº {order.id_pedido}</span> realizado em{" "}
        <span>{transformDateFromDBToClient(order.data_pedido)}</span> às{" "}
        <span>{getHourFromDate(order.data_pedido)}</span> - Total: R$ <span>{transformPriceToString(order.valor_total)}</span>
      </p>
      <p>Tipo da entrega: {transformDeliveryType(order.tipo_entrega)}</p>
      <p>Endereço: {order.endereco}</p>
      {order.status_pedido !== "pendente" ? (
        <span>
          {toCamelCase(order.status_pedido)} às {getHourFromDate(order.data_confirmacao as string)}
        </span>
      ) : (
        <span>Pendente</span>
      )}
    </Item>
  );
};

export default OrderHistory;
