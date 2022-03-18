import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import { BiUserCircle } from "react-icons/bi/index";
import { HiOutlineLocationMarker } from "react-icons/hi/index";

import { PURPLE } from "@utils/colors";
import { getFormattedHours } from "@utils/formatters";
import { getFormattedDate } from "@utils/transformation";

import {
  OrdersCard,
  ButtonContainer,
  OrdersCardTitle,
  OrdersCardContainer,
  OrdersCardTitleContainer,
} from "./styled";
import { GeneralDataContainer, OrdersUserContainer } from "../styled";

import type ITelefone from "@models/telefone";
import type IEndereco from "@models/endereco";
import type { IOrderGeneralData } from "@models/pedido";

type OrdersGeneralDataListProps = {
  openModal: () => void;
  ordersGeneralData: IOrderGeneralData[];
};

type OrdersGeneralDataListType = (props: OrdersGeneralDataListProps) => JSX.Element;

const OrdersGeneralDataList: OrdersGeneralDataListType = ({ ordersGeneralData, openModal }) => {
  function getFormattedAddress(address: IEndereco) {
    return `${address.logradouro} Nº ${address.numero}, ${address.bairro}`;
  }

  function getFormattedOrderDate(date: Date) {
    const parsedDate = new Date(date);

    return `${getFormattedDate(parsedDate)} - ${getFormattedHours(parsedDate)}`;
  }

  function getFormattedOrderPhone(phone: ITelefone) {
    return `(${phone.ddd})-${phone.numero}`;
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
            {order.endereco && (
              <Fragment>
                <HiOutlineLocationMarker size={40} color={PURPLE} />
                <GeneralDataContainer>
                  <p>{getFormattedAddress(order.endereco)}</p>
                  {order.endereco.complemento && (
                    <span>Complemento: {order.endereco.complemento}</span>
                  )}
                </GeneralDataContainer>
              </Fragment>
            )}
          </OrdersUserContainer>

          <ButtonContainer>
            <Button onClick={openModal} variant="contained" color="primary" size="small">
              Detalhes do pedido
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button variant="outlined" color="secondary">
              Rejeitar
            </Button>
            <Button variant="contained" color="secondary">
              Confirmar
            </Button>
          </ButtonContainer>
        </OrdersCard>
      ))}
    </OrdersCardContainer>
  );
};

export default OrdersGeneralDataList;
