import React, { memo, Fragment } from "react";

import { PURPLE } from "@utils/colors";
import { StatusPedido } from "@models/pedido";
import { getFormattedHours } from "@utils/formatters";
import { getFormattedDate } from "@utils/transformation";
import { HiOutlineLocationMarker } from "react-icons/hi/index";
import Button from "@material-ui/core/Button";
import { IoMdRestaurant } from "react-icons/io/index"

import { calculateTotalPrice } from "@utils/order";
import { getOrderPaymentTypeText } from "../utility";
import type { IOrderRelations } from "@models/pedido";
import { getNumberAsCurrency } from "@utils/transformation";
import { getFormattedOrderDate, getFormattedAddress } from "@components/Admin/Orders/utility/order";

import { OrdersContainerListHighlight, OrdersDataContainer } from "./styled";

import {
  OrdersUserContainer,
  GeneralDataContainer,
  ButtonContainer,
} from "@components/Admin/Orders/OrdersGeneralDataList/styled";

import {
  OrdersCardContainer,
  OrdersCard,
  OrdersCardActionsContainer,
  OrdersCardTitle,
  OrdersCardTitleContainer,
} from "@components/Admin/Orders/OrdersGeneralDataList/styled";

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

  return (
    <OrdersCardContainer>
      {ordersRelations.map((orderRelation) => (
        <OrdersCard key={`order-history-${orderRelation.id_pedido}`}>
          <OrdersCardTitleContainer>
            <OrdersCardTitle>{`#${orderRelation.id_pedido}`}</OrdersCardTitle>
            <OrdersCardTitle>
              {getFormattedOrderDate(orderRelation.data_pedido as Date)}
            </OrdersCardTitle>
          </OrdersCardTitleContainer>

          <OrdersUserContainer>
            {orderRelation.endereco ? (
              <Fragment>
                <HiOutlineLocationMarker size={40} color={PURPLE} />
                <GeneralDataContainer>
                  <p>{getFormattedAddress(orderRelation.endereco)}</p>
                  {orderRelation.endereco.complemento && (
                    <span>Complemento: {orderRelation.endereco.complemento}</span>
                  )}
                </GeneralDataContainer>
              </Fragment>
            ) : (
              <Fragment>
                <IoMdRestaurant size={40} color={PURPLE} />
                <GeneralDataContainer>
                  <p>O pedido deve ser retirado no restaurante</p>
                </GeneralDataContainer>
              </Fragment>
            )}
          </OrdersUserContainer>
          <OrdersDataContainer>
            <p>
              <OrdersContainerListHighlight>Status:</OrdersContainerListHighlight>{" "}
              {`${getOrderStatusText(orderRelation)}`}
            </p>

            <p>
              <OrdersContainerListHighlight>Pagamento:</OrdersContainerListHighlight>{" "}
              {`${getOrderPaymentTypeText(orderRelation)}`}
            </p>
          </OrdersDataContainer>
          <p>
            <OrdersContainerListHighlight>Total:</OrdersContainerListHighlight>{" "}
            {`${getNumberAsCurrency(
              calculateTotalPrice(
                orderRelation.pedido_produto as any,
                orderRelation.pedido_produto_adicional as any,
                orderRelation.tipo_entrega,
                orderRelation.preco_entrega,
                orderRelation.cupom
              )
            )}`}
          </p>
          <OrdersCardActionsContainer>
            <ButtonContainer>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => openModal(orderRelation)}
              >
                Detalhes do pedido
              </Button>
            </ButtonContainer>
          </OrdersCardActionsContainer>
        </OrdersCard>
      ))}
    </OrdersCardContainer>
  );
};

export default memo(OrdersList);
