import React, { memo, Fragment } from "react";

import { ERROR_RED, ORANGE, PURPLE, SUCCESS_GREEN } from "@utils/colors";
import { StatusPedido } from "@models/pedido";
import { getFormattedHours } from "@utils/formatters";
import { getFormattedDate } from "@utils/transformation";
import { HiOutlineLocationMarker } from "react-icons/hi/index";
import Button from "@material-ui/core/Button";
import { IoMdRestaurant } from "react-icons/io/index";

import { calculateTotalPrice } from "@utils/order";
import { getOrderPaymentTypeText } from "../utility";
import type { IOrderRelations } from "@models/pedido";
import { getNumberAsCurrency } from "@utils/transformation";
import { getFormattedOrderDate, getFormattedAddress } from "@components/Admin/Orders/utility/order";

import { OrdersDataContainer, OrdersStatus } from "./styled";

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

type OrdersListProps = {
  ordersRelations: IOrderRelations[];
  openModal: (orderRelations: IOrderRelations) => void;
};

type OrdersListType = (props: OrdersListProps) => JSX.Element;

const OrdersList: OrdersListType = ({ ordersRelations, openModal }) => {
  function getOrderStatusText(orderRelation: IOrderRelations) {
    if (orderRelation.status_pedido === StatusPedido.CONFIRMADO && orderRelation.data_confirmacao) {
      const confirmatedDate = new Date(orderRelation.data_confirmacao);
      const formattedConfirmationDate = getFormattedDate(confirmatedDate);
      const confirmatioDateHours = getFormattedHours(confirmatedDate);
      return `confirmado em ${formattedConfirmationDate} às ${confirmatioDateHours}`;
    }

    if (orderRelation.status_pedido === StatusPedido.REJEITADO && orderRelation.data_confirmacao) {
      const confirmatedDate = new Date(orderRelation.data_confirmacao);
      const formattedConfirmationDate = getFormattedDate(confirmatedDate);
      const confirmatioDateHours = getFormattedHours(confirmatedDate);
      return `rejeitado em ${formattedConfirmationDate} às ${confirmatioDateHours}`;
    }

    if (orderRelation.status_pedido === StatusPedido.PENDENTE) return `pendente`;
  }

  function orderStatusHighlight(orderStatus: StatusPedido) {
    switch (orderStatus) {
      case StatusPedido.CONFIRMADO: {
        return SUCCESS_GREEN;
      }
      case StatusPedido.REJEITADO: {
        return ERROR_RED;
      }
      default: {
        return ORANGE;
      }
    }
  }

  return (
    <CardContainer>
      {ordersRelations.map((orderRelation) => (
        <Card key={`order-history-${orderRelation.id_pedido}`}>
          <CardTitleContainer>
            <CardTitle>{`#${orderRelation.id_pedido}`}</CardTitle>
            <CardTitle>{getFormattedOrderDate(orderRelation.data_pedido as Date)}</CardTitle>
          </CardTitleContainer>

          <UserDataContainer>
            {orderRelation.endereco ? (
              <Fragment>
                <HiOutlineLocationMarker size={40} color={PURPLE} />
                <UserGeneralDataContainer>
                  <p>{getFormattedAddress(orderRelation.endereco)}</p>
                  {orderRelation.endereco.complemento && (
                    <span>Complemento: {orderRelation.endereco.complemento}</span>
                  )}
                </UserGeneralDataContainer>
              </Fragment>
            ) : (
              <Fragment>
                <IoMdRestaurant size={40} color={PURPLE} />
                <UserGeneralDataContainer>
                  <p>O pedido deve ser retirado no restaurante</p>
                </UserGeneralDataContainer>
              </Fragment>
            )}
          </UserDataContainer>
          <OrdersDataContainer>
            <p>
              <b>Status:</b>{" "}
              <OrdersStatus
                color={orderStatusHighlight(orderRelation.status_pedido)}
              >{`${getOrderStatusText(orderRelation)}`}</OrdersStatus>
            </p>

            <p>
              <b>Pagamento:</b> {`${getOrderPaymentTypeText(orderRelation)}`}
            </p>
          </OrdersDataContainer>
          <p>
            <b>Total:</b>{" "}
            {`${getNumberAsCurrency(
              calculateTotalPrice(
                orderRelation.pedido_produto,
                orderRelation.pedido_produto_adicional,
                orderRelation.tipo_entrega,
                orderRelation.preco_entrega,
                orderRelation.cupom
              )
            )}`}
          </p>
          <CardActionsContainer>
            <CardButtonContainer>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => openModal(orderRelation)}
              >
                Detalhes do pedido
              </Button>
            </CardButtonContainer>
          </CardActionsContainer>
        </Card>
      ))}
    </CardContainer>
  );
};

export default memo(OrdersList);
