import React from "react";
import { Modal } from "@components/shared";
import { PURPLE } from "@utils/colors";

import { BiUserCircle } from "react-icons/bi/index";
import { HiOutlineLocationMarker } from "react-icons/hi/index";

import {
  AdminOrdersModalTitle,
  AdminOrdersModalUserDataContainer,
  AdminOrdersPaymentValues,
  AdminOrdersPaymentValuesContainer,
  AdminPaymentType,
} from "./styled";
import { OrdersUserContainer, OrdersUser } from "../styled";

type AdminOrderDetailsModalProps = {
  onClose: () => void;
};

const AdminOrderDetailsModal: React.FC<AdminOrderDetailsModalProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose} key="admin-order-relations-modal">
      <AdminOrdersModalTitle>
        Pedido #1987
        <p>11/03/2022 - 21:34</p>
      </AdminOrdersModalTitle>
      <AdminOrdersModalUserDataContainer>
        <OrdersUserContainer>
          <BiUserCircle size={40} color={PURPLE} />
          <OrdersUser>
            <p>Rafael Hiro Kato Kawakami</p>
            <span>(44) 98765-4321</span>
          </OrdersUser>
        </OrdersUserContainer>
        <OrdersUserContainer>
          <HiOutlineLocationMarker size={40} color={PURPLE} />
          <OrdersUser>
            <p>Rua Vitória de Monte Castelo N° 472, Centro</p>
            <span>Complemento: Casa</span>
          </OrdersUser>
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
    </Modal>
  );
};

export default AdminOrderDetailsModal;
