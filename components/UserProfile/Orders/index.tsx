import React, { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import { PINK } from "@utils/colors";
import { StatusPedido } from "@models/pedido";
import { FaPlusCircle } from "react-icons/fa";
import { createDate } from "@utils/transformation/date";
import { getFormattedDate } from "@utils/transformation";
import { MoreDetails, OrdersContainer, OrdersContainerList } from "./styled";
import { PageContainer, PageTitle } from "@components/shared";

import { calculateTotalPrice, getOrderPaymentTypeText, getNumberAsCurrency } from "./utility";

import type { IOrderRelations } from "@models/pedido";
import { getFormattedHours } from "@utils/formatters";

type OrdersProps = {
  ordersRelations: IOrderRelations[];
};

const Orders: React.FC<OrdersProps> = ({ ordersRelations }) => {
  const [modalItem, setModalItem] = useState<IOrderRelations | null>(null);

  function openModal(orderRelation: IOrderRelations) {
    setModalItem(orderRelation);
  }

  function closeModal() {
    setModalItem(null);
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
      {modalItem && <OrderDetailsModal orderRelations={modalItem} onClose={closeModal} />}
      <PageTitle>Pedidos</PageTitle>
      <OrdersContainer>
        {ordersRelations.map((orderRelation) => (
          <OrdersContainerList
            whileHover={{ scale: 1.1, cursor: "pointer" }}
            key={`order-history-${orderRelation.id_pedido}`}
          >
            <p>
              {`Pedido ${orderRelation.id_pedido} - ${getFormattedDate(
                orderRelation.data_pedido
              )} às ${getFormattedHours(createDate(orderRelation.data_pedido))}`}
            </p>
            <p>{`Status: ${getOrderStatusText(orderRelation)}`}</p>
            <p>{`Total: ${getNumberAsCurrency(calculateTotalPrice(orderRelation))}`}</p>
            <p>{`Pagamento: ${getOrderPaymentTypeText(orderRelation)}`}</p>
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
