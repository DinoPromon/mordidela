import React, { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import { BiUserCircle } from "react-icons/bi/index";
import { HiOutlineLocationMarker } from "react-icons/hi/index";
import { IoMdRestaurant } from "react-icons/io/index";

import Axios from "@api";
import useRequestState from "@hooks/useRequestState";
import { PURPLE } from "@utils/colors";
import { StatusPedido } from "@models/pedido";
import { LoadingButton } from "@components/shared";
import { getFormattedHours, formatPhoneNumber } from "@utils/formatters";
import { getFormattedDate } from "@utils/transformation";

import {
  OrdersCard,
  ButtonContainer,
  OrdersCardTitle,
  OrdersUserContainer,
  OrdersCardContainer,
  GeneralDataContainer,
  OrdersCardTitleContainer,
  OrdersCardActionsContainer,
  ConfirmationMessage,
} from "./styled";

import type { AxiosError } from "axios";
import type IPedido from "@models/pedido";
import type ITelefone from "@models/telefone";
import type IEndereco from "@models/endereco";
import type { IOrderGeneralData } from "@models/pedido";

type LoadingOrderStatus = {
  orderId: number;
  orderStatus: StatusPedido;
};

type OrdersGeneralDataListProps = {
  ordersGeneralData: IOrderGeneralData[];
  onOpenModal: () => void;
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

  function getFormattedAddress(address: IEndereco) {
    return `${address.logradouro} Nº ${address.numero}, ${address.bairro}`;
  }

  function getFormattedOrderDate(date: Date) {
    const parsedDate = new Date(date);

    return `${getFormattedDate(parsedDate)} - ${getFormattedHours(parsedDate)}`;
  }

  function getFormattedOrderPhone(phone: ITelefone) {
    return formatPhoneNumber(phone.ddd.concat(phone.numero));
  }

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
    <OrdersCardContainer>
      {ordersGeneralData.map((order) => (
        <OrdersCard key={`${order.id_pedido}`}>
          <OrdersCardTitleContainer>
            <OrdersCardTitle>{`#${order.id_pedido}`}</OrdersCardTitle>
            <OrdersCardTitle>{getFormattedOrderDate(order.data_pedido as Date)}</OrdersCardTitle>
          </OrdersCardTitleContainer>

          <OrdersUserContainer>
            <BiUserCircle size={40} color={PURPLE} />
            <GeneralDataContainer>
              <p>{order.usuario.nome}</p>
              <span>{getFormattedOrderPhone(order.usuario.telefone[0])}</span>
            </GeneralDataContainer>
          </OrdersUserContainer>

          <OrdersUserContainer>
            {order.endereco ? (
              <Fragment>
                <HiOutlineLocationMarker size={40} color={PURPLE} />
                <GeneralDataContainer>
                  <p>{getFormattedAddress(order.endereco)}</p>
                  {order.endereco.complemento && (
                    <span>Complemento: {order.endereco.complemento}</span>
                  )}
                </GeneralDataContainer>
              </Fragment>
            ) : (
              <Fragment>
                <IoMdRestaurant size={40} color={PURPLE} />
                <GeneralDataContainer>
                  <p>O pedido será retirado no restaurante</p>
                </GeneralDataContainer>
              </Fragment>
            )}
          </OrdersUserContainer>

          {order.status_pedido === StatusPedido.CONFIRMADO && (
            <ConfirmationMessage>
              Confirmado em {getFormattedOrderDate(order.data_confirmacao as Date)}
            </ConfirmationMessage>
          )}

          {order.status_pedido === StatusPedido.REJEITADO && (
            <ConfirmationMessage>
              Rejeitado em {getFormattedOrderDate(order.data_confirmacao as Date)}
            </ConfirmationMessage>
          )}

          <OrdersCardActionsContainer>
            <ButtonContainer>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={onOpenModal}
                disabled={orderRequestStatus.isLoading}
              >
                Detalhes do pedido
              </Button>
            </ButtonContainer>

            {order.status_pedido === StatusPedido.PENDENTE && (
              <ButtonContainer>
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
              </ButtonContainer>
            )}
          </OrdersCardActionsContainer>
        </OrdersCard>
      ))}
    </OrdersCardContainer>
  );
};

export default OrdersGeneralDataList;
