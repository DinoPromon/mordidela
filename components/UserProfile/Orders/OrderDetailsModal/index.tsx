import React from "react";

import { Modal } from "@components/shared";
import { TipoCupom } from "@models/cupom";
import { TipoEntrega } from "@models/pedido";
import {
  AddsText,
  ColoredText,
  AddressTitle,
  SubtotalText,
  TrashPriceText,
  OrderFlavorsText,
  ProductsContainer,
  AddsListContainer,
  TrashPriceContainer,
  CoupomDataContainer,
  ItemDescriptionContainer,
  TotalTextOrdersUserProfile,
} from "@components/shared/StyledComponents";
import { getNumberAsCurrency } from "@utils/transformation";
import {
  calculateTotalPrice,
  getHasDeliveryPrice,
  getAddsInOrderProduct,
  calculateSubTotalPrice,
  calculateCouponDiscount,
  getStringFlavorsInOrderProduct,
} from "@utils/order";

import {
  TotalContainer,
  OrdersModalTitle,
  OrdersDataContainer,
  OrdersAddressContainer,
  OrdersAddressComplement,
} from "./styled";
import { getOrderPaymentTypeText } from "../utility";

import type ICupom from "@models/cupom";
import type IProduto from "@models/produto";
import type IEndereco from "@models/endereco";
import type { IOrderRelations } from "@models/pedido";

type OrderDetailsModalProps = {
  orderRelations: IOrderRelations;
  onClose: () => void;
};

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ orderRelations, onClose }) => {
  function getCouponDiscountText(coupon: ICupom) {
    if (coupon.tipo === TipoCupom.ENTREGA) return "Entrega grátis";
    return `${coupon.valor_desconto}%`;
  }

  function getProductLabel(product: IProduto) {
    if (product.tamanho) {
      return `${product.nome} - ${product.tamanho}`;
    }

    return product.nome;
  }

  function getDeliveryType(orderRelations: IOrderRelations) {
    switch (orderRelations.tipo_entrega) {
      case TipoEntrega.BALCAO:
        return "Balcão";
      case TipoEntrega.ENTREGA:
        return "Delivery";
      default:
        const exhaustiveCheck = orderRelations.tipo_entrega;
        return exhaustiveCheck;
    }
  }

  function getFormattedOrderAddress(address: IEndereco) {
    const formattedOrderAddress = `${address.logradouro} Nº ${address.numero}, ${address.bairro}`;

    return formattedOrderAddress;
  }

  return (
    <Modal onClose={onClose}>
      <OrdersModalTitle>Pedido {orderRelations.id_pedido}</OrdersModalTitle>
      <ProductsContainer>
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
                  orderRelations.pedido_produto_adicional as any,
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
                        orderRelations.pedido_produto_sabor as any,
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
      </ProductsContainer>

      <OrdersDataContainer>
        <SubtotalText>
          Subtotal:{" "}
          <span>
            {getNumberAsCurrency(
              calculateSubTotalPrice(
                orderRelations.pedido_produto as any,
                orderRelations.pedido_produto_adicional as any
              )
            )}
          </span>
        </SubtotalText>

        {orderRelations.cupom && (
          <CoupomDataContainer>
            <ColoredText>
              Cupom: <span>{orderRelations.cupom.codigo}</span>
            </ColoredText>
            <ColoredText>
              Desconto: <span>{getCouponDiscountText(orderRelations.cupom)}</span>
            </ColoredText>
            <ColoredText>
              Valor:{" "}
              <span>
                {getNumberAsCurrency(
                  calculateCouponDiscount(
                    orderRelations.pedido_produto as any,
                    orderRelations.pedido_produto_adicional as any,
                    orderRelations.cupom,
                    orderRelations.preco_entrega
                  )
                )}
              </span>
            </ColoredText>
          </CoupomDataContainer>
        )}

        <SubtotalText>
          Tipo de entrega: <span>{getDeliveryType(orderRelations)}</span>
        </SubtotalText>

        {getHasDeliveryPrice(orderRelations.tipo_entrega) && (
          <SubtotalText>
            Taxa de entrega: <span>{getNumberAsCurrency(orderRelations.preco_entrega)}</span>
          </SubtotalText>
        )}

        <SubtotalText>
          Tipo de pagamento: <span>{getOrderPaymentTypeText(orderRelations)}</span>
        </SubtotalText>
      </OrdersDataContainer>

      {orderRelations.endereco && (
        <OrdersAddressContainer>
          <AddressTitle>Endereço de entrega</AddressTitle>
          <p>{getFormattedOrderAddress(orderRelations.endereco)}</p>
          {orderRelations.endereco.complemento && (
            <OrdersAddressComplement>
              Complemento: {orderRelations.endereco.complemento}
            </OrdersAddressComplement>
          )}
        </OrdersAddressContainer>
      )}

      <TotalContainer>
        <TotalTextOrdersUserProfile>
          Total:{" "}
          <span>
            {getNumberAsCurrency(
              calculateTotalPrice(
                orderRelations.pedido_produto as any,
                orderRelations.pedido_produto_adicional as any,
                orderRelations.tipo_entrega,
                orderRelations.preco_entrega,
                orderRelations.cupom
              )
            )}
          </span>
        </TotalTextOrdersUserProfile>
      </TotalContainer>
    </Modal>
  );
};

export default OrderDetailsModal;
