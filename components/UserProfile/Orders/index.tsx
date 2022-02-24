import React, { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import { PINK } from "@utils/colors";
import { StatusPedido } from "@models/pedido";
import { FaPlusCircle } from "react-icons/fa";
import { createDate } from "@utils/transformation/date";
import { getFormatedDate } from "@utils/transformation";
import { MoreDetails, OrdersContainer } from "./styled";
import { PageContainer, PageTitle } from "@components/shared";

import { calculateTotalPrice, getOrderPaymentTypeText, getNumberAsCurrency } from "./utility";

import type { IOrderRelations } from "@models/pedido";

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

  function getFormattedHours(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes}`;
  }

  function getOrderStatusText(orderRelation: IOrderRelations) {
    if (orderRelation.status_pedido === StatusPedido.CONFIRMADO && orderRelation.data_confirmacao) {
      const confirmatedDate = createDate(orderRelation.data_confirmacao);
      const formattedConfirmationDate = getFormatedDate(confirmatedDate);
      const confirmatioDateHours = getFormatedDate(confirmatedDate);

      return `confirmado em ${formattedConfirmationDate} às ${confirmatioDateHours}`;
    }

    if (orderRelation.status_pedido === StatusPedido.REJEITADO) return `rejeitado`;

    if (orderRelation.status_pedido === StatusPedido.PENDENTE) return `pendente`;
  }

  return (
    <PageContainer>
      {modalItem && <OrderDetailsModal orderRelations={modalItem} onClose={closeModal} />}
      <PageTitle>Pedidos</PageTitle>
      <ul>
        {ordersRelations.map((orderRelation) => (
          <li key={`order-history-${orderRelation.id_pedido}`}>
            <OrdersContainer>
              <p>
                {`Pedido ${orderRelation.id_pedido} - ${getFormatedDate(
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
            </OrdersContainer>
          </li>
        ))}
      </ul>
    </PageContainer>
  );
};

export default Orders;
