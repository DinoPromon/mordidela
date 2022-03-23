import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Button, TextField } from "@material-ui/core";

import Axios from "@api";
import useIsMounted from "@hooks/useIsMounted";
import useRequestState from "@hooks/useRequestState";
import CustomAnimatePresence from "@components/shared/CustomAnimatePresence";
import { StatusPedido } from "@models/pedido";
import { CentralizedLoading, InputTextFormik, LoadingButton } from "@components/shared";

import { FindDateFilter } from "./constants";

const OrdersGeneralDataList = dynamic(() => import("./OrdersGeneralDataList"));
const AdminOrderDetailsModal = dynamic(() => import("./AdminOrderDetailsModal"));
import {
  NoRequests,
  OrdersFilter,
  OrdersContainer,
  FiltersContainer,
  LoadMoreButtonContainer,
  DateFilterContainer,
} from "./styled";

import type { AxiosError } from "axios";
import type IPedido from "@models/pedido";
import type { IOrderGeneralData } from "@models/pedido";
import type { OrdersGeneralDataResponse } from "@my-types/responses";

const Orders: React.FC = () => {
  const isMounted = useIsMounted();
  const [requestStatus, changeRequestStatus] = useRequestState({ error: "", isLoading: true });
  const [count, setCount] = useState<number>();
  const [filterOptions] = useState<FindDateFilter>(FindDateFilter.TODAY);
  const [skipItems, setSkipItems] = useState(0);
  const [isInitialRequest, setIsInitialRequest] = useState(true);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<number>();
  const [ordersGeneralData, setOrdersGeneralData] = useState<IOrderGeneralData[]>([]);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<StatusPedido | undefined>(
    StatusPedido.PENDENTE
  );

  const fetchOrdersGeneralData = useCallback(
    async (skip?: number, orderStatus?: StatusPedido) => {
      changeRequestStatus({ error: "", isLoading: true });
      try {
        const response = await Axios.get<OrdersGeneralDataResponse>("/order/general-data", {
          params: {
            status_pedido: orderStatus,
            // tipo de filtro
            // filtro_data_pedido?: FindDateFilter;
            // data
            // data_pedido?: ;
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

  function openModal(selectedOrderId: number) {
    setSelectedOrderDetails(selectedOrderId);
  }

  function closeModal() {
    setSelectedOrderDetails(undefined);
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

  function getDateFilterText(filterOption?: FindDateFilter) {
    switch (filterOption) {
      case FindDateFilter.TODAY:
        return "Exibindo os pedidos de";

      case FindDateFilter.LAST_7_DAYS:
        return "Exibindo os pedidos dos últimos";

      case FindDateFilter.LAST_30_DAYS:
        return "Exibindo os pedidos dos últimos";

      case FindDateFilter.DATE:
        return "Exibindo os pedidos da";

      case undefined:
        return "Exibindo todos os pedidos";

      default:
        return filterOption;
    }
  }

  useEffect(() => {
    fetchOrdersGeneralData(0, StatusPedido.PENDENTE);
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
          Todos os pedidos
        </OrdersFilter>
      </FiltersContainer>

      <DateFilterContainer>
        <h4>{getDateFilterText(filterOptions)}</h4>
        <TextField variant="outlined" size="small" select style={{ width: "120px" }} />
        <TextField
          size="small"
          label="Data"
          variant="outlined"
          style={{ width: "120px" }}
          inputProps={{ style: { textAlign: "center" } }}
        />
        <Button variant="contained" color="primary">
          Filtrar
        </Button>
      </DateFilterContainer>

      {isInitialRequest && requestStatus.isLoading && <CentralizedLoading />}

      {!isInitialRequest && ordersGeneralData.length > 0 && (
        <OrdersGeneralDataList
          ordersGeneralData={ordersGeneralData}
          onOpenModal={openModal}
          onUpdateListedOrderStatus={updateListedOrderStatus}
        />
      )}

      {count === 0 && selectedOrderStatus === StatusPedido.REJEITADO && (
        <NoRequests>Não há pedidos rejeitados!</NoRequests>
      )}

      {count === 0 && selectedOrderStatus === StatusPedido.CONFIRMADO && (
        <NoRequests>Não há pedidos confirmados!</NoRequests>
      )}

      {count === 0 && selectedOrderStatus === StatusPedido.PENDENTE && (
        <NoRequests>Não há pedidos pendentes</NoRequests>
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
