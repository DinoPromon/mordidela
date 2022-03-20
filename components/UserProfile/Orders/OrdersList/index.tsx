import React, { memo } from "react";
import { FaPlusCircle } from "react-icons/fa";

import { PINK } from "@utils/colors";
import { StatusPedido } from "@models/pedido";
import { getFormattedHours } from "@utils/formatters";
import { createDate } from "@utils/transformation/date";
import { getFormattedDate } from "@utils/transformation";

import {
  MoreDetails,
  OrdersContainer,
  OrdersContainerItem,
  OrdersContainerListHighlight,
} from "./styled";
import { getOrderPaymentTypeText } from "../utility";
import { calculateTotalPrice } from "@utils/order";
import { getNumberAsCurrency } from "@utils/transformation";

import type { IOrderRelations } from "@models/pedido";

type OrdersListProps = {
  ordersRelations: IOrderRelations[];
  openModal: (orderRelations: IOrderRelations) => void;
};

type OrdersListType = (props: OrdersListProps) => JSX.Element;

const OrdersList: OrdersListType = ({ ordersRelations, openModal }) => {
  function getOrderStatusText(orderRelation: IOrderRelations) {
    if (orderRelation.status_pedido === StatusPedido.CONFIRMADO && orderRelation.data_confirmacao) {
      const confirmatedDate = createDate(orderRelation.data_confirmacao);
      const formattedConfirmationDate = getFormattedDate(confirmatedDate);
      const confirmatioDateHours = getFormattedHours(confirmatedDate);
      return `confirmado em ${formattedConfirmationDate} às ${confirmatioDateHours}`;
    }

    if (orderRelation.status_pedido === StatusPedido.REJEITADO && orderRelation.data_confirmacao) {
      const confirmatedDate = createDate(orderRelation.data_confirmacao);
      const formattedConfirmationDate = getFormattedDate(confirmatedDate);
      const confirmatioDateHours = getFormattedHours(confirmatedDate);
      return `rejeitado em ${formattedConfirmationDate} às ${confirmatioDateHours}`;
    }

    if (orderRelation.status_pedido === StatusPedido.PENDENTE) return `pendente`;
  }

  return (
    <OrdersContainer>
      {ordersRelations.map((orderRelation) => (
        <OrdersContainerItem
          whileHover={{ scale: 1.07 }}
          key={`order-history-${orderRelation.id_pedido}`}
        >
          <p>
            <OrdersContainerListHighlight>
              Pedido {`${orderRelation.id_pedido}`}
            </OrdersContainerListHighlight>{" "}
            {`- ${getFormattedDate(orderRelation.data_pedido)} às ${getFormattedHours(
              new Date(orderRelation.data_pedido)
            )}`}
          </p>
          <p>
            <OrdersContainerListHighlight>Status:</OrdersContainerListHighlight>{" "}
            {`${getOrderStatusText(orderRelation)}`}
          </p>
          <p>
            <OrdersContainerListHighlight>Total:</OrdersContainerListHighlight>{" "}
            {`${getNumberAsCurrency(
              calculateTotalPrice(
                orderRelation.pedido_produto as any,
                orderRelation.pedido_produto_adicional as any,
                orderRelation.tipo_entrega,
                orderRelation.preco_entrega,
                orderRelation.cupom
              )
            )}`}
          </p>
          <p>
            <OrdersContainerListHighlight>Pagamento:</OrdersContainerListHighlight>{" "}
            {`${getOrderPaymentTypeText(orderRelation)}`}
          </p>
          <MoreDetails onClick={() => openModal(orderRelation)}>
            <FaPlusCircle size={12} color={PINK} />
            <p>Detalhes</p>
          </MoreDetails>
        </OrdersContainerItem>
      ))}
    </OrdersContainer>
  );
};

export default memo(OrdersList);
