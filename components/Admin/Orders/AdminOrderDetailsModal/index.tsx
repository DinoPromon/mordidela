import React, { useEffect, useCallback, Fragment } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BiUserCircle } from "react-icons/bi/index";
import { HiOutlineLocationMarker } from "react-icons/hi/index";

import Axios from "@api";
import useIsMounted from "@hooks/useIsMounted";
import useRequestState from "@hooks/useRequestState";
import { PURPLE } from "@utils/colors";
import { Modal } from "@components/shared";

import {
  LoadingContainer,
  AdminPaymentType,
  AdminOrdersModalTitle,
  AdminOrdersPaymentValues,
  AdminOrdersModalUserDataContainer,
  AdminOrdersPaymentValuesContainer,
} from "./styled";
import { OrdersUserContainer, GeneralDataContainer } from "../OrdersGeneralDataList/styled";

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
  const [requestStatus, changeRequestStatus] = useRequestState({ error: "", isLoading: true });

  const fetchOrderFullData = useCallback(
    async (orderId: number) => {
      changeRequestStatus({ isLoading: true });
      try {
        const response = await Axios.get<IOrderFullData>(`order/full-data/${orderId}`);
        if (!isMounted.current) return;

        console.log(response.data);
      } catch (err) {
        const error = err as AxiosError;
        console.error(error.response?.data.message);
      }
      changeRequestStatus({ isLoading: false });
    },
    [isMounted, changeRequestStatus]
  );

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

      {!requestStatus.isLoading && (
        <Fragment>
          <AdminOrdersModalTitle>
            Pedido #1987
            <p>11/03/2022 - 21:34</p>
          </AdminOrdersModalTitle>
          <AdminOrdersModalUserDataContainer>
            <OrdersUserContainer>
              <BiUserCircle size={40} color={PURPLE} />
              <GeneralDataContainer>
                <p>Rafael Hiro Kato Kawakami</p>
                <span>(44) 98765-4321</span>
              </GeneralDataContainer>
            </OrdersUserContainer>
            <OrdersUserContainer>
              <HiOutlineLocationMarker size={40} color={PURPLE} />
              <GeneralDataContainer>
                <p>Rua Vitória de Monte Castelo N° 472, Centro</p>
                <span>Complemento: Casa</span>
              </GeneralDataContainer>
            </OrdersUserContainer>
          </AdminOrdersModalUserDataContainer>

          {/*       <ProductsContainer>
        {orderRelations.pedido_produto.map((orderProduct) => (
          <li key={orderProduct.id_pedido_produto}>
            <ItemDescriptionContainer>
              <span>{`${orderProduct.quantidade}x`}</span>
              <p>{getProductLabel(orderProduct.produto as IProduto)}</p>
              <TrashPriceContainer>
                <TrashPriceText>
                  {getNumberAsCurrency(orderProduct.produto?.preco_padrao as number)}
                </TrashPriceText>
              </TrashPriceContainer>
            </ItemDescriptionContainer>

            {orderRelations.pedido_produto_adicional.length > 0 && (
              <AddsListContainer>
                {getAddsInOrderProduct(
                  orderRelations,
                  orderProduct.id_pedido,
                  orderProduct.id_produto
                ).map((add) => (
                  <AddsText key={`add-${add.id_adicional}`}>
                    Adicional: {add.nome} <span>{getNumberAsCurrency(add.preco)}</span>
                  </AddsText>
                ))}

                {orderRelations.pedido_produto_sabor.length > 0 && (
                  <OrderFlavorsText>
                    {"Sabores: ".concat(
                      getStringFlavorsInOrderProduct(
                        orderRelations,
                        orderProduct.id_pedido,
                        orderProduct.id_produto
                      )
                    )}
                  </OrderFlavorsText>
                )}
              </AddsListContainer>
            )}
          </li>
        ))}
      </ProductsContainer> */}

          <AdminOrdersPaymentValuesContainer>
            <AdminOrdersPaymentValues>
              <p>Subtotal</p>
              <p>R$ 20,90</p>
            </AdminOrdersPaymentValues>
            <AdminOrdersPaymentValues>
              <p>
                Cupom de desconto: <span>TESTE</span>
              </p>
              <p>R$ 2,00</p>
            </AdminOrdersPaymentValues>
            <AdminOrdersPaymentValues>
              <p>Taxa de entrega</p>
              <p>R$ 4,00</p>
            </AdminOrdersPaymentValues>
            <AdminOrdersPaymentValues>
              <p>TOTAL</p>
              <p>R$ 22,90</p>
            </AdminOrdersPaymentValues>
          </AdminOrdersPaymentValuesContainer>

          <AdminPaymentType>
            <p>Forma de pagamento</p>
            <span>Dinheiro (troco para R$ 50,00) = R$ 27,10</span>
          </AdminPaymentType>
        </Fragment>
      )}
    </Modal>
  );
};

export default AdminOrderDetailsModal;
