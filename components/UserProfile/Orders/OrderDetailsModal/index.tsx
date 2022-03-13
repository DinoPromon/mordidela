import React from "react";

import { Modal } from "@components/shared";
import { TipoCupom } from "@models/cupom";
import { TipoEntrega } from "@models/pedido";
import {
  AddsText,
  ColoredText,
  AddresTitle,
  SubtotalText,
  TrashPriceText,
  AddresComplement,
  AddsListContainer,
  TrashPriceContainer,
  CoupomDataContainer,
  ProductsContainer,
  ItemDescriptionContainer,
  TotalTextOrdersUserProfile,
} from "@components/shared/StyledComponents";

import {
  TotalContainer,
  OrderFlavorsText,
  OrdersModalTitle,
  OrdersDataContainer,
  OrdersAddresContainer,
  OrdersAddresComplement,
} from "./styled";
import {
  getNumberAsCurrency,
  getHasDeliveryPrice,
  calculateTotalPrice,
  calculateSubTotalPrice,
  getOrderPaymentTypeText,
  calculateCouponDiscount,
} from "../utility";

import type ICupom from "@models/cupom";
import type IPedido from "@models/pedido";
import type IProduto from "@models/produto";
import type IEndereco from "@models/endereco";
import type IAdicional from "@models/adicional";
import type { IOrderRelations } from "@models/pedido";

type OrderDetailsModalProps = {
  orderRelations: IOrderRelations;
  onClose: () => void;
};

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ orderRelations, onClose }) => {
  function filterOrderProductAdds(
    orderRelations: IOrderRelations,
    orderId: IPedido["id_pedido"],
    productId: IProduto["id_produto"]
  ) {
    const filteredOrderProductAdds = orderRelations.pedido_produto_adicional.filter(
      ({ id_pedido, id_produto }) => id_pedido === orderId && id_produto === productId
    );

    return filteredOrderProductAdds;
  }

  function getAddsInOrderProduct(
    orderRelations: IOrderRelations,
    orderId: IPedido["id_pedido"],
    productId: IProduto["id_produto"]
  ) {
    const filteredOrderProductAdds = filterOrderProductAdds(orderRelations, orderId, productId);

    const addsInOrderProduct = filteredOrderProductAdds.map(
      (orderProductAdd) => orderProductAdd.adicional as IAdicional
    );

    return addsInOrderProduct;
  }

  function getStringFlavorsInOrderProduct(
    orderRelations: IOrderRelations,
    orderId: IPedido["id_pedido"],
    productId: IProduto["id_produto"]
  ) {
    const filteredOrderProductFlavors = orderRelations.pedido_produto_sabor.filter(
      ({ id_pedido, id_produto }) => id_pedido === orderId && id_produto === productId
    );

    const flavorsNameInOrderProduct = filteredOrderProductFlavors.map(
      (orderProductFlavor) => orderProductFlavor.sabor?.nome as string
    );

    return flavorsNameInOrderProduct.join(", ");
  }

  function getCouponDiscount(coupon: ICupom) {
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
    const formattedOrderAddres = `${address.logradouro} Nº ${address.numero}, ${address.bairro}`;

    return formattedOrderAddres;
  }

  return (
    <Modal onClose={onClose} key="order-relations-modal">
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
      </ProductsContainer>

      <OrdersDataContainer>
        <SubtotalText>
          Subtotal: <span>{getNumberAsCurrency(calculateSubTotalPrice(orderRelations))}</span>
        </SubtotalText>

        {orderRelations.cupom && (
          <CoupomDataContainer>
            <ColoredText>
              Cupom: <span>{orderRelations.cupom.codigo}</span>
            </ColoredText>
            <ColoredText>
              Desconto: <span>{getCouponDiscount(orderRelations.cupom)}</span>
            </ColoredText>
            <ColoredText>
              Valor: <span>{getNumberAsCurrency(calculateCouponDiscount(orderRelations))}</span>
            </ColoredText>
          </CoupomDataContainer>
        )}

        <SubtotalText>
          Tipo de entrega: <span>{getDeliveryType(orderRelations)}</span>
        </SubtotalText>

        {getHasDeliveryPrice(orderRelations) && (
          <SubtotalText>
            Taxa de entrega: <span>{getNumberAsCurrency(orderRelations.preco_entrega)}</span>
          </SubtotalText>
        )}

        <SubtotalText>
          Tipo de pagamento: <span>{getOrderPaymentTypeText(orderRelations)}</span>
        </SubtotalText>
      </OrdersDataContainer>

      {orderRelations.endereco && (
        <OrdersAddresContainer>
          <AddresTitle>Endereço de entrega</AddresTitle>
          <p>{getFormattedOrderAddress(orderRelations.endereco)}</p>
          {orderRelations.endereco.complemento && (
            <OrdersAddresComplement>
              Complemento: {orderRelations.endereco.complemento}
            </OrdersAddresComplement>
          )}
        </OrdersAddresContainer>
      )}

      <TotalContainer>
        <TotalTextOrdersUserProfile>
          Total: <span>{getNumberAsCurrency(calculateTotalPrice(orderRelations))}</span>
        </TotalTextOrdersUserProfile>
      </TotalContainer>
    </Modal>
  );
};

export default OrderDetailsModal;
