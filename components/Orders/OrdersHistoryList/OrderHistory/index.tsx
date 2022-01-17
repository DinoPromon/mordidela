import { ViewPedidoForClient } from "@models/views";
import React from "react";

import { ColoredText, OrderHistoryItem, MoreDetails } from "./styled";
import { PINK } from "@utils/colors";
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
    <OrderHistoryItem>
      <p>
        Pedido <ColoredText color={PINK}>Nº {order.id_pedido}</ColoredText> realizado em{" "}
        <ColoredText color={PINK}>{transformDateFromDBToClient(order.data_pedido)}</ColoredText> às{" "}
        <ColoredText color={PINK}>{getHourFromDate(order.data_pedido)}</ColoredText>
      </p>
      <p>Tipo da entrega: {transformDeliveryType(order.tipo_entrega)}</p>
      <p>Taxa de entrega: <ColoredText color={PINK}>R$ 3,50</ColoredText></p>
      <p>Endereço: {order.endereco}</p>
      <p>Total: <ColoredText color={PINK}> R$ {transformPriceToString(order.valor_total)}</ColoredText></p>
      <p>Pagamento: <ColoredText color={PINK}>Dinheiro (troco para R$ 100,00)</ColoredText></p>
      {order.status_pedido !== "pendente" ? (
        <span>
          Status: <ColoredText color={PINK}>{toCamelCase(order.status_pedido)}</ColoredText> às <ColoredText color={PINK}>{getHourFromDate(order.data_confirmacao as string)}</ColoredText>
        </span>
      ) : (
        <span>
          Status: <ColoredText color={PINK}>pendente</ColoredText>
        </span>
      )}
      <MoreDetails>+ detalhes</MoreDetails>
    </OrderHistoryItem>
  );
};

export default OrderHistory;
