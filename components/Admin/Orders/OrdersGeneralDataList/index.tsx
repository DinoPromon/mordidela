import React, { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import { BiUserCircle } from "react-icons/bi/index";
import { IoMdRestaurant } from "react-icons/io/index";
import { HiOutlineLocationMarker } from "react-icons/hi/index";

import Axios from "@api";
import useRequestState from "@hooks/useRequestState";
import { PURPLE } from "@utils/colors";
import { StatusPedido } from "@models/pedido";
import { LoadingButton } from "@components/shared";

import {
  getFormattedAddress,
  getFormattedOrderPhone,
  getFormattedOrderDate,
} from "../utility/order";

import {
  ConfirmationMessage,
  RejectionMessage,
} from "./styled";

import {
  CardContainer,
  CardTitle,
  CardTitleContainer,
  UserDataContainer,
  UserGeneralDataContainer,
  CardActionsContainer,
  CardButtonContainer,
  Card,
} from "@components/shared/OrdersCard";

import type { AxiosError } from "axios";
import type IPedido from "@models/pedido";
import type { IOrderGeneralData } from "@models/pedido";

type LoadingOrderStatus = {
  orderId: number;
  orderStatus: StatusPedido;
};

type OrdersGeneralDataListProps = {
  ordersGeneralData: IOrderGeneralData[];
  onOpenModal: (selectedOrderId: number) => void;
  onUpdateListedOrderStatus: (newOrderData: IPedido) => void;
};

type OrdersGeneralDataListType = (props: OrdersGeneralDataListProps) => JSX.Element;

const OrdersGeneralDataList: OrdersGeneralDataListType = ({
  ordersGeneralData,
  onOpenModal,
  onUpdateListedOrderStatus,
}) => {
  const [orderRequestStatus, changeOrderRequestStatus] = useRequestState();
  const [loadingStatus, setLoadingStatus] = useState<LoadingOrderStatus>();

  async function updateOrderStatus(orderId: number, newStatus: StatusPedido) {
    changeOrderRequestStatus({ isLoading: true });
    setLoadingStatus({ orderId, orderStatus: newStatus });

    try {
      const response = await Axios.put<IPedido>(`order/update-status/${orderId}`, {
        status_pedido: newStatus,
      });

      onUpdateListedOrderStatus(response.data);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data.message);
    }

    changeOrderRequestStatus({ isLoading: false });
    setLoadingStatus(undefined);
  }

  return (
    <CardContainer>
      {ordersGeneralData.map((order) => (
        <Card key={`${order.id_pedido}`}>
          <CardTitleContainer>
            <CardTitle>{`#${order.id_pedido}`}</CardTitle>
            <CardTitle>{getFormattedOrderDate(order.data_pedido as Date)}</CardTitle>
          </CardTitleContainer>

          <UserDataContainer>
            <BiUserCircle size={40} color={PURPLE} />
            <UserGeneralDataContainer>
              <p>{order.usuario.nome}</p>
              <span>{getFormattedOrderPhone(order.usuario.telefone[0])}</span>
            </UserGeneralDataContainer>
          </UserDataContainer>

          <UserDataContainer>
            {order.endereco ? (
              <Fragment>
                <HiOutlineLocationMarker size={40} color={PURPLE} />
                <UserGeneralDataContainer>
                  <p>{getFormattedAddress(order.endereco)}</p>
                  {order.endereco.complemento && (
                    <span>Complemento: {order.endereco.complemento}</span>
                  )}
                </UserGeneralDataContainer>
              </Fragment>
            ) : (
              <Fragment>
                <IoMdRestaurant size={40} color={PURPLE} />
                <UserGeneralDataContainer>
                  <p>O pedido será retirado no restaurante</p>
                </UserGeneralDataContainer>
              </Fragment>
            )}
          </UserDataContainer>

          {order.status_pedido === StatusPedido.CONFIRMADO && (
            <ConfirmationMessage>
              Confirmado em {getFormattedOrderDate(order.data_confirmacao as Date)}
            </ConfirmationMessage>
          )}

          {order.status_pedido === StatusPedido.REJEITADO && (
            <RejectionMessage>
              Rejeitado em {getFormattedOrderDate(order.data_confirmacao as Date)}
            </RejectionMessage>
          )}

          <CardActionsContainer>
            <CardButtonContainer>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => onOpenModal(order.id_pedido)}
                disabled={orderRequestStatus.isLoading}
              >
                Detalhes do pedido
              </Button>
            </CardButtonContainer>

            {order.status_pedido === StatusPedido.PENDENTE && (
              <CardButtonContainer>
                <LoadingButton
                  variant="outlined"
                  color="secondary"
                  disabled={orderRequestStatus.isLoading}
                  isLoading={
                    loadingStatus?.orderStatus === StatusPedido.REJEITADO &&
                    loadingStatus.orderId === order.id_pedido
                  }
                  onClick={() => updateOrderStatus(order.id_pedido, StatusPedido.REJEITADO)}
                >
                  Rejeitar
                </LoadingButton>
                <LoadingButton
                  color="secondary"
                  variant="contained"
                  disabled={orderRequestStatus.isLoading}
                  isLoading={
                    loadingStatus?.orderStatus === StatusPedido.CONFIRMADO &&
                    loadingStatus.orderId === order.id_pedido
                  }
                  onClick={() => updateOrderStatus(order.id_pedido, StatusPedido.CONFIRMADO)}
                >
                  Confirmar
                </LoadingButton>
              </CardButtonContainer>
            )}
          </CardActionsContainer>
        </Card>
      ))}
    </CardContainer>
  );
};

export default OrdersGeneralDataList;
