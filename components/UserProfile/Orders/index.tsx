import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

import CustomAnimatePresence from "@components/shared/CustomAnimatePresence";
import { PINK } from "@utils/colors";
import { StatusPedido } from "@models/pedido";
import { getFormattedHours } from "@utils/formatters";
import { createDate } from "@utils/transformation/date";
import { getFormattedDate } from "@utils/transformation";
import { PageContainer, PageTitle } from "@components/shared";

import OrderDetailsModal from "./OrderDetailsModal";
import { calculateTotalPrice, getOrderPaymentTypeText, getNumberAsCurrency } from "./utility";
import {
  MoreDetails,
  OrdersContainer,
  OrdersContainerList,
  OrdersContainerListHighlight,
} from "./styled";

import type { IOrderRelations } from "@models/pedido";

type OrdersProps = {
  ordersRelations: IOrderRelations[];
};

const Orders: React.FC<OrdersProps> = ({ ordersRelations }) => {
  const [selectedOrder, setSelectedOrder] = useState<IOrderRelations | null>(null);

  function openModal(orderRelation: IOrderRelations) {
    setSelectedOrder(orderRelation);
  }

  function closeModal() {
    setSelectedOrder(null);
  }

  function getOrderStatusText(orderRelation: IOrderRelations) {
    if (orderRelation.status_pedido === StatusPedido.CONFIRMADO && orderRelation.data_confirmacao) {
      const confirmatedDate = createDate(orderRelation.data_confirmacao);
      const formattedConfirmationDate = getFormattedDate(confirmatedDate);
      const confirmatioDateHours = getFormattedHours(confirmatedDate);

      return `confirmado em ${formattedConfirmationDate} às ${confirmatioDateHours}`;
    }

    if (orderRelation.status_pedido === StatusPedido.REJEITADO) return `rejeitado`;

    if (orderRelation.status_pedido === StatusPedido.PENDENTE) return `pendente`;
  }

  return (
    <PageContainer>
      <CustomAnimatePresence exitBeforeEnter>
        {selectedOrder && (
          <OrderDetailsModal
            key="order-relations-modal"
            orderRelations={selectedOrder}
            onClose={closeModal}
          />
        )}
      </CustomAnimatePresence>
      <PageTitle>Pedidos</PageTitle>
      <OrdersContainer>
        {ordersRelations.map((orderRelation) => (
          <OrdersContainerList
            whileHover={{ scale: 1.07 }}
            key={`order-history-${orderRelation.id_pedido}`}
          >
            <p>
              <OrdersContainerListHighlight>
                Pedido {`${orderRelation.id_pedido}`}
              </OrdersContainerListHighlight>{" "}
              {`- ${getFormattedDate(orderRelation.data_pedido)} às ${getFormattedHours(
                createDate(orderRelation.data_pedido)
              )}`}
            </p>
            <p>
              <OrdersContainerListHighlight>Status:</OrdersContainerListHighlight>{" "}
              {`${getOrderStatusText(orderRelation)}`}
            </p>
            <p>
              <OrdersContainerListHighlight>Total:</OrdersContainerListHighlight>{" "}
              {`${getNumberAsCurrency(calculateTotalPrice(orderRelation))}`}
            </p>
            <p>
              <OrdersContainerListHighlight>Pagamento:</OrdersContainerListHighlight>{" "}
              {`${getOrderPaymentTypeText(orderRelation)}`}
            </p>
            <MoreDetails onClick={() => openModal(orderRelation)}>
              <FaPlusCircle size={12} color={PINK} />
              <p>Detalhes</p>
            </MoreDetails>
          </OrdersContainerList>
        ))}
      </OrdersContainer>
    </PageContainer>
  );
};

export default Orders;
