import React, { useState } from "react";
import Modal from "@components/shared/Modal";
import { PINK } from "@utils/colors";
import { FaPlusCircle } from "react-icons/fa";
import { PageContainer, PageTitle } from "@components/shared";
import {
  MoreDetails,
  OrdersAddresContainer,
  OrdersContainer,
  OrdersDataContainer,
  OrdersModalTitle,
  TotalContainer,
} from "./styled";
import {
  ProductsListContainer,
  ItemDescriptionContainer,
  TrashPriceContainer,
  TrashPriceText,
  AddsListContainer,
  AddsText,
  SubtotalText,
  TotalText,
  CoupomDataContainer,
  ColoredText,
  AddresTitle,
  AddresComplement,
} from "@components/shared/SharedStyledComponents";
import { IOrderRelations } from "@models/pedido";

type OrdersProps = {
  ordersRelations: IOrderRelations[];
};

const Orders: React.FC<OrdersProps> = ({ ordersRelations }) => {
  const [showModal, setShowModal] = useState(false);

  console.log(ordersRelations);

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
          <OrdersModalTitle>Pedido 1425</OrdersModalTitle>
          <ProductsListContainer>
            <ItemDescriptionContainer>
              <span>1x</span>
              <p>Mini salgados - 100 unidades</p>
              <TrashPriceContainer>
                <TrashPriceText>R$ 23,90</TrashPriceText>
              </TrashPriceContainer>
            </ItemDescriptionContainer>
            <AddsListContainer>
              <AddsText>
                Adicional: Barbecue <span>R$ 2,00</span>
              </AddsText>
              <AddsText>
                Adicional: Mostarda e mel <span>R$ 2,00</span>
              </AddsText>
              <AddsText>
                Adicional: Maionese verde <span>R$ 2,00</span>
              </AddsText>
              <AddsText>
                Adicional: Pimenta <span>R$ 2,00</span>
              </AddsText>
              Sabores: Bolinha de queijo, Coxinha de carne, Coxinha de frango, Coxinha de presunto e
              queijo
            </AddsListContainer>
          </ProductsListContainer>

          <OrdersDataContainer>
            <SubtotalText>
              Subtotal: <span>R$ 31,90</span>
            </SubtotalText>
            <CoupomDataContainer>
              <ColoredText>
                Cupom: <span>TESTE</span>
              </ColoredText>
              <ColoredText>
                Desconto: <span>10%</span>
              </ColoredText>
              <ColoredText>
                Valor: <span>R$ 3,19</span>
              </ColoredText>
            </CoupomDataContainer>
            <SubtotalText>
              Tipo de entrega: <span>Delivery</span>
            </SubtotalText>
            <SubtotalText>
              Taxa de entrega: <span>R$ 4,00</span>
            </SubtotalText>
            <SubtotalText>
              Tipo de pagamento: <span>Dinheiro (troco para R$ 50,00)</span>
            </SubtotalText>
          </OrdersDataContainer>

          <OrdersAddresContainer>
            <AddresTitle>Endereço de entrega</AddresTitle>
            <p>Rua dos Alfeneiros Nº 4, Little Whinging</p>
            <AddresComplement>Complemento: Casa</AddresComplement>
          </OrdersAddresContainer>

          <TotalContainer>
            <TotalText>
              Total: <span>R$ 32,71</span>
            </TotalText>
          </TotalContainer>
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
