import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { getSession } from "next-auth/client";

import Axios from "@api";
import useIsMounted from "@hooks/useIsMounted";
import useRequestState from "@hooks/useRequestState";
import {
  PageTitle,
  PageContainer,
  LoadingButton,
  CustomAnimatePresence,
  CentralizedLoading,
} from "@components/shared";

const OrdersList = dynamic(() => import("./OrdersList"));
const OrderDetailsModal = dynamic(() => import("./OrderDetailsModal"));
import { LoadMoreContainer, WarningMessage, ReloadContainer } from "./styled";

import type { AxiosError } from "axios";
import type { IOrderRelations } from "@models/pedido";
import type { OrdersRelationsResponse } from "@my-types/responses";
import { Button } from "@material-ui/core";

const Orders: React.FC = () => {
  const isMounted = useIsMounted();
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
        const response = await Axios.get<OrdersRelationsResponse>(
          `/order/relations/${session.user.id_usuario}`,
          {
            params: {
              skip: skip || 0,
            },
          }
        );
        if (!isMounted.current) return;

        setIsInitialRequest(false);
        setSkipItems((prevState) => prevState + response.data.items.length);
        setOrdersRelations((prevState) => [...prevState, ...response.data.items]);
        setCount(response.data.count);
      } catch (err) {
        if (!isMounted.current) return;

        const error = err as AxiosError;
        console.log(error.response?.data.message);
        changeRequestStatus({ error: error.response?.data.message });
      }
      changeRequestStatus({ isLoading: false });
    },
    [changeRequestStatus, isMounted]
  );

  const openModal = useCallback((orderRelation: IOrderRelations) => {
    setSelectedOrder(orderRelation);
  }, []);

  function closeModal() {
    setSelectedOrder(null);
  }

  function loadMoreClickHandler() {
    fetchUserOrdersRelations(skipItems);
  }

  function reload() {
    window.location.reload();
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
      <ReloadContainer>
        <h4>
          Para visualizar se o status do pedido foi alterado, recarregue a página periodicamente
          apertando F5 ou o botão
        </h4>
        <Button variant="contained" color="secondary" onClick={reload}>
          Recarregar
        </Button>
      </ReloadContainer>
      {isInitialRequest && requestStatus.isLoading && <CentralizedLoading />}
      {!isInitialRequest && ordersRelations.length !== 0 && (
        <OrdersList ordersRelations={ordersRelations} openModal={openModal} />
      )}

      {!isInitialRequest && ordersRelations.length === 0 && (
        <WarningMessage>Você ainda não fez pedidos!</WarningMessage>
      )}

      <CustomAnimatePresence>
        {count !== undefined && count > skipItems && (
          <LoadMoreContainer as={motion.div} exit={{ opacity: 0 }}>
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
