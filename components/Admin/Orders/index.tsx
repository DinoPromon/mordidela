import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

import Axios from "@api";
import useIsMounted from "@hooks/useIsMounted";
import useRequestState from "@hooks/useRequestState";
import CustomAnimatePresence from "@components/shared/CustomAnimatePresence";
import { StatusPedido } from "@models/pedido";
import { CentralizedLoading, LoadingButton } from "@components/shared";

import { FindDateFilter, INIT_ORDER_FILTER } from "./constants";

import DateFilter from "./DateFilter";
const OrdersGeneralDataList = dynamic(() => import("./OrdersGeneralDataList"));
const AdminOrderDetailsModal = dynamic(() => import("./AdminOrderDetailsModal"));

import {
  NoRequests,
  OrdersContainer,
  FiltersContainer,
  LoadMoreButtonContainer,
  OrdersFilter,
} from "./styled";

import type { AxiosError } from "axios";
import type IPedido from "@models/pedido";
import type { IOrderGeneralData } from "@models/pedido";
import type { OrdersGeneralDataResponse } from "@my-types/responses";
import type { OrderFilterParams } from "./types/orderFilter";

const Orders: React.FC = () => {
  const isMounted = useIsMounted();
  const [requestStatus, changeRequestStatus] = useRequestState({ error: "", isLoading: true });
  const [orderFilter, setOrderFilter] = useState<OrderFilterParams>(INIT_ORDER_FILTER);
  const [count, setCount] = useState<number>();
  const [isInitialRequest, setIsInitialRequest] = useState(true);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<number>();
  const [ordersGeneralData, setOrdersGeneralData] = useState<IOrderGeneralData[]>([]);

  const fetchOrdersGeneralData = useCallback(
    async (fetchParams: OrderFilterParams) => {
      changeRequestStatus({ error: "", isLoading: true });
      try {
        const response = await Axios.get<OrdersGeneralDataResponse>("/order/general-data", {
          params: {
            status_pedido: fetchParams.orderStatus,
            filtro_data_pedido: fetchParams.dateFilter,
            data_pedido: fetchParams.date || undefined,
            skip: fetchParams.skip,
          },
        });
        if (!isMounted.current) return;

        setCount(response.data.count);
        setIsInitialRequest(false);
        setOrdersGeneralData((prevsState) => [...prevsState, ...response.data.items]);
        setOrderFilter((prevState) => ({
          ...prevState,
          skip: prevState.skip + response.data.items.length,
        }));
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
    fetchOrdersGeneralData(orderFilter);
  }

  function openModal(selectedOrderId: number) {
    setSelectedOrderDetails(selectedOrderId);
  }

  function closeModal() {
    setSelectedOrderDetails(undefined);
  }

  function resetSearch() {
    setCount(undefined);
    setIsInitialRequest(true);
    setOrdersGeneralData([]);
  }

  function changeOrderFilter(orderStatus: StatusPedido | undefined) {
    if (requestStatus.isLoading) return;

    resetSearch();
    setOrderFilter((prevState) => ({ ...prevState, skip: INIT_ORDER_FILTER.skip, orderStatus }));
    fetchOrdersGeneralData({
      ...orderFilter,
      skip: 0,
      orderStatus,
    });
  }

  function updateListedOrderStatus(newOrderData: IPedido) {
    setOrdersGeneralData((prevState) => {
      const orderIndex = prevState.findIndex(
        (prevOrder) => prevOrder.id_pedido === newOrderData.id_pedido
      );

      if (orderIndex <= -1) return prevState;

      const newOrdersGeneralData = [...prevState];
      newOrdersGeneralData[orderIndex].status_pedido = newOrderData.status_pedido;
      newOrdersGeneralData[orderIndex].data_confirmacao = newOrderData.data_confirmacao;

      return newOrdersGeneralData;
    });
  }

  async function dateFilterSubmitHandler(dateFilter: FindDateFilter, date?: string) {
    resetSearch();
    setOrderFilter((prevState) => ({
      ...prevState,
      skip: INIT_ORDER_FILTER.skip,
      dateFilter,
      date,
    }));

    await fetchOrdersGeneralData({
      skip: INIT_ORDER_FILTER.skip,
      orderStatus: orderFilter.orderStatus,
      dateFilter,
      date,
    });
  }

  useEffect(() => {
    fetchOrdersGeneralData(INIT_ORDER_FILTER);
  }, [fetchOrdersGeneralData]);

  return (
    <OrdersContainer>
      <CustomAnimatePresence exitBeforeEnter>
        {selectedOrderDetails && (
          <AdminOrderDetailsModal
            key="admin-order-relations-modal"
            onClose={closeModal}
            selectedOrderId={selectedOrderDetails}
          />
        )}
      </CustomAnimatePresence>

      <FiltersContainer>
        <OrdersFilter
          disabled={requestStatus.isLoading}
          selected={orderFilter.orderStatus === StatusPedido.PENDENTE}
          onClick={() => changeOrderFilter(StatusPedido.PENDENTE)}
        >
          Pedidos pendentes
        </OrdersFilter>
        <OrdersFilter
          disabled={requestStatus.isLoading}
          selected={orderFilter.orderStatus === StatusPedido.CONFIRMADO}
          onClick={() => changeOrderFilter(StatusPedido.CONFIRMADO)}
        >
          Pedidos confirmados
        </OrdersFilter>
        <OrdersFilter
          disabled={requestStatus.isLoading}
          selected={orderFilter.orderStatus === StatusPedido.REJEITADO}
          onClick={() => changeOrderFilter(StatusPedido.REJEITADO)}
        >
          Pedidos rejeitados
        </OrdersFilter>
        <OrdersFilter
          disabled={requestStatus.isLoading}
          selected={orderFilter.orderStatus === undefined}
          onClick={() => changeOrderFilter(undefined)}
        >
          Todos os pedidos
        </OrdersFilter>
      </FiltersContainer>

      <DateFilter onSubmit={dateFilterSubmitHandler} />

      {isInitialRequest && requestStatus.isLoading && <CentralizedLoading />}

      {!isInitialRequest && ordersGeneralData.length > 0 && (
        <OrdersGeneralDataList
          ordersGeneralData={ordersGeneralData}
          onOpenModal={openModal}
          onUpdateListedOrderStatus={updateListedOrderStatus}
        />
      )}

      {count === 0 && orderFilter.orderStatus === StatusPedido.REJEITADO && (
        <NoRequests>Não há pedidos rejeitados!</NoRequests>
      )}

      {count === 0 && orderFilter.orderStatus === StatusPedido.CONFIRMADO && (
        <NoRequests>Não há pedidos confirmados!</NoRequests>
      )}

      {count === 0 && orderFilter.orderStatus === StatusPedido.PENDENTE && (
        <NoRequests>Não há pedidos pendentes</NoRequests>
      )}

      {count !== undefined && orderFilter.skip < count && (
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
