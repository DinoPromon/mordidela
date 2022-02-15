import React, { useState } from "react";
import { PageContainer, PageTitle } from "@components/shared";
import { MoreDetails, OrdersContainer } from "./styled";
import { FaPlusCircle } from "react-icons/fa";
import { PINK } from "@utils/colors";
import Modal from "@components/shared/Modal";
import { CartFormTitle } from "@components/Cart/styled";
import CartItemDescription from "@components/Cart/CartOrdersList/CartItemDescription";

const Orders: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <PageContainer>
      {showModal && (
        <Modal onClose={closeModal}>
          <CartFormTitle>Pedido 1425</CartFormTitle>
          
        </Modal>
      )}
      <PageTitle>Pedidos</PageTitle>
      <OrdersContainer>
        <p>Pedido 1425 - 11/02/2021 às 22:05</p>
        <p>Status: confirmado em 11/02/2021 às 22:30</p>
        <p>Total: R$ 23,50</p>
        <p>Pagamento: dinheiro (troco para R$ 30,00)</p>
        <MoreDetails onClick={openModal}>
          <FaPlusCircle size={12} color={PINK} />
          <p>Detalhes</p>
        </MoreDetails>
      </OrdersContainer>
    </PageContainer>
  );
};

export default Orders;
