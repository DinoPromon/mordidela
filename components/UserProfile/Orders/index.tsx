import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { getSession } from "next-auth/client";
import { FaPlusCircle } from "react-icons/fa";

import Axios from "@api";
import useRequestState from "@hooks/useRequestState";
import { PINK } from "@utils/colors";
import { StatusPedido } from "@models/pedido";
import { getFormattedHours } from "@utils/formatters";
import { createDate } from "@utils/transformation/date";
import { getFormattedDate } from "@utils/transformation";
import {
  PageTitle,
  PageContainer,
  LoadingButton,
  CustomAnimatePresence,
  CentralizedLoading,
} from "@components/shared";

import OrderDetailsModal from "./OrderDetailsModal";
import { calculateTotalPrice, getOrderPaymentTypeText, getNumberAsCurrency } from "./utility";
import {
  MoreDetails,
  OrdersContainer,
  LoadMoreContainer,
  OrdersContainerItem,
  OrdersContainerListHighlight,
} from "./styled";

import type { AxiosError } from "axios";
import type { IOrderRelations } from "@models/pedido";
import type { FindAllOrderRelationsResponse } from "@my-types/responses";

const Orders: React.FC = () => {
  const [isInitialRequest, setIsInitialRequest] = useState(true);
  const [count, setCount] = useState<number>();
  const [skipItems, setSkipItems] = useState(0);
  const [requestStatus, changeRequestStatus] = useRequestState();
  const [ordersRelations, setOrdersRelations] = useState<IOrderRelations[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrderRelations | null>(null);

  const fetchUserOrdersRelations = useCallback(
    async (skip?: number) => {
      changeRequestStatus({ isLoading: true });
      const session = await getSession();
      if (!session) return;

      try {
        const response = await Axios.get<FindAllOrderRelationsResponse>(
          `/order/relations/${session.user.id_usuario}`,
          {
            params: {
              skip: skip || 0,
            },
          }
        );
        setCount(response.data.count);
        setOrdersRelations((prevState) => [...prevState, ...response.data.items]);
        setSkipItems((prevState) => prevState + response.data.items.length);
        setIsInitialRequest(false);
      } catch (err) {
        const error = err as AxiosError;
        console.log(error.response?.data.message);
        changeRequestStatus({ error: error.response?.data.message });
      }
      changeRequestStatus({ isLoading: false });
    },
    [changeRequestStatus]
  );

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

  function loadMoreClickHandler() {
    fetchUserOrdersRelations(skipItems);
  }

  useEffect(() => {
    fetchUserOrdersRelations();
  }, [fetchUserOrdersRelations]);

  return (
    <PageContainer>
      <CustomAnimatePresence exitBeforeEnter>
        {selectedOrder && <OrderDetailsModal orderRelations={selectedOrder} onClose={closeModal} />}
      </CustomAnimatePresence>

      <PageTitle>Pedidos</PageTitle>
      {isInitialRequest && requestStatus.isLoading && <CentralizedLoading />}
      {!isInitialRequest && ordersRelations.length && (
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
            </OrdersContainerItem>
          ))}
        </OrdersContainer>
      )}

      <CustomAnimatePresence>
        {count && count < skipItems && (
          <LoadMoreContainer key="sabe-de-nada-hehe" as={motion.div} exit={{ opacity: 0 }}>
            <LoadingButton
              variant="contained"
              color="secondary"
              isLoading={requestStatus.isLoading}
              onClick={loadMoreClickHandler}
            >
              Carregar mais
            </LoadingButton>
          </LoadMoreContainer>
        )}
      </CustomAnimatePresence>
    </PageContainer>
  );
};

export default Orders;
