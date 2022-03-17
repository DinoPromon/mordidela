import React from "react";
import Button from "@material-ui/core/Button";
import { BiUserCircle } from "react-icons/bi/index";
import { HiOutlineLocationMarker } from "react-icons/hi/index";

import { PURPLE } from "@utils/colors";

import {
  OrdersUser,
  OrdersCard,
  ButtonContainer,
  OrdersCardTitle,
  OrdersUserContainer,
  OrdersCardContainer,
  OrdersCardTitleContainer,
} from "./styled";

import type { IOrderGeneralData } from "@models/pedido";

type OrdersGeneralDataListProps = {
  openModal: () => void;
  ordersGeneralData: IOrderGeneralData[];
};

type OrdersGeneralDataListType = (props: OrdersGeneralDataListProps) => JSX.Element;

const OrdersGeneralDataList: OrdersGeneralDataListType = ({ ordersGeneralData, openModal }) => {
  return (
    <OrdersCardContainer>
      {ordersGeneralData.map((order) => (
        <OrdersCard key={`${order.id_pedido}`}>
          <OrdersCardTitleContainer>
            <OrdersCardTitle>{`#${order.id_pedido}`}</OrdersCardTitle>
            <OrdersCardTitle>11/03/2022 - 21:34</OrdersCardTitle>
          </OrdersCardTitleContainer>
          <OrdersUserContainer>
            <BiUserCircle size={40} color={PURPLE} />
            <OrdersUser>
              <p>{order.usuario.nome}</p>
              <span>{`${order.usuario.telefone[0].ddd}-${order.usuario.telefone[0].numero}`}</span>
            </OrdersUser>
          </OrdersUserContainer>
          <OrdersUserContainer>
            <HiOutlineLocationMarker size={40} color={PURPLE} />
            <OrdersUser>
              <p>Rua Vitória de Monte Castelo N° 472, Centro</p>
              <span>Complemento: Casa</span>
            </OrdersUser>
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
