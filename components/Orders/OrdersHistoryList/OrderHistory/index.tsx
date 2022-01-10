import { ViewPedidoForClient } from "@models/views";
import React from "react";

import { ColoredText, Item } from "./styled";
import { PURPLE, PINK } from "@utils/colors";
import {
  toCamelCase,
  getHourFromDate,
  transformDeliveryType,
  transformPriceToString,
  transformDateFromDBToClient,
} from "@utils/transformation";

type Props = {
  order: ViewPedidoForClient;
};

const OrderHistory: React.FC<Props> = (props) => {
  const { order } = props;

  return (
    <Item>
      <p>
        Pedido <ColoredText color={PINK}>Nº {order.id_pedido}</ColoredText> realizado em{" "}
        <ColoredText color={PURPLE}>{transformDateFromDBToClient(order.data_pedido)}</ColoredText> às{" "}
        <ColoredText color={PINK}>{getHourFromDate(order.data_pedido)}</ColoredText> - Total: R${" "}
        <ColoredText color={PURPLE}>{transformPriceToString(order.valor_total)}</ColoredText>
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
