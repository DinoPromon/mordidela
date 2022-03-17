import React, { useState, useEffect, Fragment } from "react";
import dynamic from "next/dynamic";

import Axios from "@api";
import useIsMounted from "@hooks/useIsMounted";
import useRequestState from "@hooks/useRequestState";
import CustomAnimatePresence from "@components/shared/CustomAnimatePresence";
import { CentralizedLoading, LoadingButton } from "@components/shared";

const OrdersGeneralDataList = dynamic(() => import("./OrdersGeneralDataList"));
import AdminOrderDetailsModal from "./AdminOrderDetailsModal";
import {
  OrdersButton,
  OrdersContainer,
  OrdersButtonContainer,
  LoadMoreButtonContainer,
} from "./styled";

import type { AxiosError } from "axios";
import type { IOrderGeneralData } from "@models/pedido";
import type { OrdersGeneralDataResponse } from "@my-types/responses";

const Orders: React.FC = () => {
  const isMounted = useIsMounted();
  const [requestStatus, changeRequestStatus] = useRequestState();
  const [count, setCount] = useState<number>();
  const [skipItems, setSkipItems] = useState(0);
  const [show, setShowModal] = useState(false);
  const [isInitialRequest, setIsInitialRequest] = useState(true);
  const [ordersGeneralData, setOrdersGeneralData] = useState<IOrderGeneralData[]>([]);

  async function fetchOrdersGeneralData(skip?: number) {
    changeRequestStatus({ error: "", isLoading: true });
    try {
      const response = await Axios.get<OrdersGeneralDataResponse>("/order/general-data", {
        params: {
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
  }

  function loadMoreHandler() {
    fetchOrdersGeneralData(skipItems);
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  useEffect(() => {
    fetchOrdersGeneralData();
  }, []);

  return (
    <OrdersContainer>
      <CustomAnimatePresence exitBeforeEnter>
        {show && <AdminOrderDetailsModal key="admin-order-relations-modal" onClose={closeModal} />}
      </CustomAnimatePresence>
      {isInitialRequest && requestStatus.isLoading && <CentralizedLoading />}

      {!isInitialRequest && (
        <Fragment>
          <OrdersButtonContainer>
            <OrdersButton>Pedidos pendentes (10)</OrdersButton>
            <OrdersButton>Pedidos confirmados (5)</OrdersButton>
            <OrdersButton>Pedidos rejeitados (1)</OrdersButton>
            <OrdersButton>Relatório de pedidos</OrdersButton>
          </OrdersButtonContainer>

          {ordersGeneralData.length > 0 && (
            <OrdersGeneralDataList openModal={openModal} ordersGeneralData={ordersGeneralData} />
          )}
        </Fragment>
      )}

      {count && skipItems < count && (
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
