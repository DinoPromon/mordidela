import React, { useEffect, useCallback, Fragment, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BiUserCircle } from "react-icons/bi/index";
import { IoMdRestaurant } from "react-icons/io/index";
import { HiOutlineLocationMarker } from "react-icons/hi/index";

import Axios from "@api";
import useIsMounted from "@hooks/useIsMounted";
import useRequestState from "@hooks/useRequestState";
import { PURPLE } from "@utils/colors";
import { Modal } from "@components/shared";
import { TipoPagamento } from "@models/pedido";
import { getNumberAsCurrency } from "@utils/transformation";
import {
  getProductLabel,
  getAddsInOrderProduct,
  calculateTotalPrice,
  getHasDeliveryPrice,
  getProductHasFlavors,
  calculateSubTotalPrice,
  calculateCouponDiscount,
  getStringFlavorsInOrderProduct,
} from "@utils/order";
import {
  AddsText,
  TrashPriceText,
  OrderFlavorsText,
  AddsListContainer,
  ProductsContainer,
  TrashPriceContainer,
  ItemDescriptionContainer,
} from "@components/shared/StyledComponents";

import {
  LoadingContainer,
  AdminPaymentType,
  AdminOrdersModalTitle,
  AdminOrdersPaymentValues,
  AdminOrdersModalDataContainer,
  AdminOrdersModalUserDataContainer,
  AdminOrdersPaymentValuesContainer,
} from "./styled";
import { OrdersUserContainer, GeneralDataContainer } from "../OrdersGeneralDataList/styled";
import {
  getFormattedAddress,
  getFormattedOrderDate,
  getFormattedOrderPhone,
} from "../utility/order";

import type { AxiosError } from "axios";
import type { IOrderFullData } from "@models/pedido";

type AdminOrderDetailsModalProps = {
  onClose: () => void;
  selectedOrderId: number;
};

const AdminOrderDetailsModal: React.FC<AdminOrderDetailsModalProps> = ({
  selectedOrderId,
  onClose,
}) => {
  const isMounted = useIsMounted();
  const [orderFullData, setOrderFullData] = useState<IOrderFullData>();
  const [requestStatus, changeRequestStatus] = useRequestState({ error: "", isLoading: true });

  const orderTotalPrice =
    orderFullData &&
    calculateTotalPrice(
      orderFullData.pedido_produto,
      orderFullData.pedido_produto_adicional,
      orderFullData.tipo_entrega,
      orderFullData.preco_entrega,
      orderFullData.cupom
    );

  const fetchOrderFullData = useCallback(
    async (orderId: number) => {
      changeRequestStatus({ isLoading: true });
      try {
        const response = await Axios.get<IOrderFullData>(`order/full-data/${orderId}`);
        if (!isMounted.current) return;

        setOrderFullData(response.data);
      } catch (err) {
        const error = err as AxiosError;
        console.error(error.response?.data.message);
      }
      changeRequestStatus({ isLoading: false });
    },
    [isMounted, changeRequestStatus]
  );

  function calculateChangeValue(paymentValue: number) {
    console.log(paymentValue, orderTotalPrice);
    if (orderTotalPrice) return paymentValue - orderTotalPrice;
  }

  function getOrderPaymentTypeText(orderFullData: IOrderFullData) {
    switch (orderFullData.tipo_pagamento) {
      case TipoPagamento.DINHEIRO: {
        if (orderFullData.troco_para === null) return "Dinheiro - sem troco";

        const changeValue = calculateChangeValue(orderFullData.troco_para);

        if (changeValue) {
          const currencyPaymentAmount = getNumberAsCurrency(orderFullData.troco_para);
          const currencyChangeValue = getNumberAsCurrency(changeValue);

          return `Dinheiro - (troco para ${currencyPaymentAmount}) = ${currencyChangeValue}`;
        }

        return "Dinheiro - sem troco";
      }

      case TipoPagamento.DEBITO: {
        return "Cartão de débito";
      }

      case TipoPagamento.CREDITO: {
        return "Cartão de crédito";
      }

      default: {
        return orderFullData.tipo_pagamento;
      }
    }
  }

  useEffect(() => {
    fetchOrderFullData(selectedOrderId);
  }, [fetchOrderFullData, selectedOrderId]);

  return (
    <Modal onClose={onClose} key="admin-order-relations-modal">
      {requestStatus.isLoading && (
        <LoadingContainer>
          <CircularProgress color="primary" size={36} />
        </LoadingContainer>
      )}

      {!requestStatus.isLoading && orderFullData && (
        <AdminOrdersModalDataContainer>
          <AdminOrdersModalTitle>
            Pedido #{orderFullData.id_pedido}
            <p>{getFormattedOrderDate(new Date(orderFullData.data_pedido))}</p>
          </AdminOrdersModalTitle>

          <AdminOrdersModalUserDataContainer>
            <OrdersUserContainer>
              <BiUserCircle size={40} color={PURPLE} />
              <GeneralDataContainer>
                <p>{orderFullData.usuario.nome}</p>
                <span>{getFormattedOrderPhone(orderFullData.usuario.telefone[0])}</span>
              </GeneralDataContainer>
            </OrdersUserContainer>

            <OrdersUserContainer>
              {orderFullData.endereco ? (
                <Fragment>
                  <HiOutlineLocationMarker size={40} color={PURPLE} />
                  <GeneralDataContainer>
                    <p>{getFormattedAddress(orderFullData.endereco)}</p>
                    {orderFullData.endereco.complemento && (
                      <span>Complemento: {orderFullData.endereco.complemento}</span>
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
          </AdminOrdersModalUserDataContainer>

          <ProductsContainer>
            {orderFullData.pedido_produto.map((orderProduct) => (
              <li key={orderProduct.id_pedido_produto}>
                <ItemDescriptionContainer>
                  <span>{`${orderProduct.quantidade}x`}</span>
                  <p>{getProductLabel(orderProduct.produto)}</p>
                  <TrashPriceContainer>
                    <TrashPriceText>
                      {getNumberAsCurrency(orderProduct.produto?.preco_padrao as number)}
                    </TrashPriceText>
                  </TrashPriceContainer>
                </ItemDescriptionContainer>

                {orderFullData.pedido_produto_adicional.length > 0 && (
                  <AddsListContainer>
                    {getAddsInOrderProduct(
                      orderFullData.pedido_produto_adicional,
                      orderProduct.id_pedido,
                      orderProduct.id_produto
                    ).map((add) => (
                      <AddsText key={`add-${add.id_adicional}`}>
                        Adicional: {add.nome} <span>{getNumberAsCurrency(add.preco)}</span>
                      </AddsText>
                    ))}
                  </AddsListContainer>
                )}

                {getProductHasFlavors(orderProduct, orderFullData.pedido_produto_sabor) && (
                  <OrderFlavorsText>
                    {"Sabores: ".concat(
                      getStringFlavorsInOrderProduct(
                        orderFullData.pedido_produto_sabor,
                        orderProduct.id_pedido,
                        orderProduct.id_produto
                      )
                    )}
                  </OrderFlavorsText>
                )}
              </li>
            ))}
          </ProductsContainer>

          <AdminOrdersPaymentValuesContainer>
            <AdminOrdersPaymentValues>
              <p>Subtotal</p>
              <p>
                {getNumberAsCurrency(
                  calculateSubTotalPrice(
                    orderFullData.pedido_produto,
                    orderFullData.pedido_produto_adicional
                  )
                )}
              </p>
            </AdminOrdersPaymentValues>

            {orderFullData.cupom && (
              <AdminOrdersPaymentValues>
                <p>
                  Cupom de desconto: <span>{orderFullData.cupom.codigo}</span>
                </p>
                <p>
                  {getNumberAsCurrency(
                    calculateCouponDiscount(
                      orderFullData.pedido_produto,
                      orderFullData.pedido_produto_adicional,
                      orderFullData.cupom,
                      orderFullData.preco_entrega
                    )
                  )}
                </p>
              </AdminOrdersPaymentValues>
            )}

            {getHasDeliveryPrice(orderFullData.tipo_entrega) && (
              <AdminOrdersPaymentValues>
                <p>Taxa de entrega</p>
                <p>{getNumberAsCurrency(orderFullData.preco_entrega)}</p>
              </AdminOrdersPaymentValues>
            )}

            {orderTotalPrice && (
              <AdminOrdersPaymentValues>
                <p>TOTAL</p>
                <p>{getNumberAsCurrency(orderTotalPrice)}</p>
              </AdminOrdersPaymentValues>
            )}
          </AdminOrdersPaymentValuesContainer>

          <AdminPaymentType>
            <p>Forma de pagamento</p>
            <span>{getOrderPaymentTypeText(orderFullData)}</span>
          </AdminPaymentType>
        </AdminOrdersModalDataContainer>
      )}
    </Modal>
  );
};

export default AdminOrderDetailsModal;
