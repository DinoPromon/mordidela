import React, { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import { PINK } from "@utils/colors";
import { FaPlusCircle } from "react-icons/fa";
import { PageContainer, PageTitle } from "@components/shared";
import { MoreDetails, OrdersContainer } from "./styled";

import type { IOrderRelations } from "@models/pedido";

type OrdersProps = {
  ordersRelations: IOrderRelations[];
};

const Orders: React.FC<OrdersProps> = ({ ordersRelations }) => {
  const [modalItem, setModalItem] = useState<IOrderRelations | null>(null);

  console.log(ordersRelations);

  function openModal(orderRelation: IOrderRelations) {
    setModalItem(orderRelation);
  }

  function closeModal() {
    setModalItem(null);
  }

  return (
    <PageContainer>
      {modalItem && <OrderDetailsModal orderRelations={modalItem} onClose={closeModal} />}
      <PageTitle>Pedidos</PageTitle>
      <ul>
        {ordersRelations.map((orderRelation) => (
          <li key={`order-history-${orderRelation.id_pedido}`}>
            <OrdersContainer>
              <p>Pedido 1425 - 11/02/2021 às 22:05</p>
              <p>Status: confirmado em 11/02/2021 às 22:30</p>
              <p>Total: R$ 23,50</p>
              <p>Pagamento: dinheiro (troco para R$ 30,00)</p>
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
