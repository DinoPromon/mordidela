import React, { useState, useEffect, Fragment, useCallback } from "react";
import dynamic from "next/dynamic";

import Axios from "@api";
import useIsMounted from "@hooks/useIsMounted";
import useRequestState from "@hooks/useRequestState";
import CustomAnimatePresence from "@components/shared/CustomAnimatePresence";
import { StatusPedido } from "@models/pedido";
import { CentralizedLoading, LoadingButton } from "@components/shared";

const OrdersGeneralDataList = dynamic(() => import("./OrdersGeneralDataList"));
const AdminOrderDetailsModal = dynamic(() => import("./AdminOrderDetailsModal"));
import { OrdersFilter, OrdersContainer, FiltersContainer, LoadMoreButtonContainer } from "./styled";

import type { AxiosError } from "axios";
import type { IOrderGeneralData } from "@models/pedido";
import type { OrdersGeneralDataResponse } from "@my-types/responses";

const Orders: React.FC = () => {
  const isMounted = useIsMounted();
  const [requestStatus, changeRequestStatus] = useRequestState({ error: "", isLoading: true });
  const [count, setCount] = useState<number>();
  const [skipItems, setSkipItems] = useState(0);
  const [show, setShowModal] = useState(false);
  const [isInitialRequest, setIsInitialRequest] = useState(true);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<StatusPedido>();
  const [ordersGeneralData, setOrdersGeneralData] = useState<IOrderGeneralData[]>([]);

  const fetchOrdersGeneralData = useCallback(
    async (skip?: number, orderStatus?: StatusPedido) => {
      changeRequestStatus({ error: "", isLoading: true });
      try {
        const response = await Axios.get<OrdersGeneralDataResponse>("/order/general-data", {
          params: {
            status_pedido: orderStatus,
            skip: skip || 0,
          },
        });
        if (!isMounted.current) return;

        setCount(response.data.count);
        setIsInitialRequest(false);
        setOrdersGeneralData((prevsState) => [...prevsState, ...response.data.items]);
        setSkipItems((prevState) => prevState + response.data.items.length);
      } catch (err) {
        if (!isMounted.current) return;

        const error = err as AxiosError;
        console.log(error.response?.data.message);
        changeRequestStatus({ error: error.response?.data.message });
      }
      changeRequestStatus({ isLoading: false });
    },
    [isMounted, changeRequestStatus]
  );

  function loadMoreHandler() {
    fetchOrdersGeneralData(skipItems, selectedOrderStatus);
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function resetSearch() {
    setSkipItems(0);
    setCount(undefined);
    setIsInitialRequest(true);
    setOrdersGeneralData([]);
  }

  function changeOrderFilter(orderStatus: StatusPedido | undefined) {
    if (requestStatus.isLoading) return;

    resetSearch();
    setSelectedOrderStatus(orderStatus);
    fetchOrdersGeneralData(0, orderStatus);
  }

  useEffect(() => {
    fetchOrdersGeneralData();
  }, [fetchOrdersGeneralData]);

  return (
    <OrdersContainer>
      <CustomAnimatePresence exitBeforeEnter>
        {show && <AdminOrderDetailsModal key="admin-order-relations-modal" onClose={closeModal} />}
      </CustomAnimatePresence>
      <FiltersContainer>
        <OrdersFilter
          disabled={requestStatus.isLoading}
          selected={selectedOrderStatus === StatusPedido.PENDENTE}
          onClick={() => changeOrderFilter(StatusPedido.PENDENTE)}
        >
          Pedidos pendentes
        </OrdersFilter>
        <OrdersFilter
          disabled={requestStatus.isLoading}
          selected={selectedOrderStatus === StatusPedido.CONFIRMADO}
          onClick={() => changeOrderFilter(StatusPedido.CONFIRMADO)}
        >
          Pedidos confirmados
        </OrdersFilter>
        <OrdersFilter
          disabled={requestStatus.isLoading}
          selected={selectedOrderStatus === StatusPedido.REJEITADO}
          onClick={() => changeOrderFilter(StatusPedido.REJEITADO)}
        >
          Pedidos rejeitados
        </OrdersFilter>
        <OrdersFilter
          disabled={requestStatus.isLoading}
          selected={selectedOrderStatus === undefined}
          onClick={() => changeOrderFilter(undefined)}
        >
          Relatório de pedidos
        </OrdersFilter>
      </FiltersContainer>
      {isInitialRequest && requestStatus.isLoading && <CentralizedLoading />}

      {!isInitialRequest && ordersGeneralData.length > 0 && (
        <OrdersGeneralDataList openModal={openModal} ordersGeneralData={ordersGeneralData} />
      )}

      {count !== undefined && skipItems < count && (
        <LoadMoreButtonContainer>
          <LoadingButton
            color="secondary"
            variant="contained"
            isLoading={requestStatus.isLoading}
            onClick={loadMoreHandler}
          >
            Carregar mais
          </LoadingButton>
        </LoadMoreButtonContainer>
      )}
    </OrdersContainer>
  );
};

export default Orders;
