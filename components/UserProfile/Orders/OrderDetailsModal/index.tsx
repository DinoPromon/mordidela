import React, { Fragment } from "react";
import { Modal } from "@components/shared";
import { TipoCupom } from "@models/cupom";
import { TipoEntrega } from "@models/pedido";
import {
  TotalContainer,
  OrderFlavorsText,
  OrdersModalTitle,
  OrdersDataContainer,
  OrdersAddresContainer,
} from "./styled";
import {
  AddsText,
  TotalText,
  ColoredText,
  AddresTitle,
  SubtotalText,
  TrashPriceText,
  AddresComplement,
  AddsListContainer,
  TrashPriceContainer,
  CoupomDataContainer,
  ProductsListContainer,
  ItemDescriptionContainer,
} from "@components/shared/SharedStyledComponents";

import {
  getNumberAsCurrency,
  getHasDeliveryPrice,
  calculateTotalPrice,
  calculateSubTotalPrice,
  getOrderPaymentTypeText,
} from "../utility";

import type ICupom from "@models/cupom";
import type IPedido from "@models/pedido";
import type IProduto from "@models/produto";
import type IEndereco from "@models/endereco";
import type IAdicional from "@models/adicional";
import type { IOrderRelations } from "@models/pedido";

type OrderDetailsModalProps = {
  onClose: () => void;
  orderRelations: IOrderRelations;
};

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ orderRelations, onClose }) => {
  function filterOrderProductAdds(
    orderId: IPedido["id_pedido"],
    productId: IProduto["id_produto"]
  ) {
    const filteredOrderProductAdds = orderRelations.pedido_produto_adicional.filter(
      ({ id_pedido, id_produto }) => id_pedido === orderId && id_produto === productId
    );

    return filteredOrderProductAdds;
  }

  function getAddsInOrderProduct(orderId: IPedido["id_pedido"], productId: IProduto["id_produto"]) {
    const filteredOrderProductAdds = filterOrderProductAdds(orderId, productId);

    const addsInOrderProduct = filteredOrderProductAdds.map(
      (orderProductAdd) => orderProductAdd.adicional as IAdicional
    );

    return addsInOrderProduct;
  }

  function getStringFlavorsInOrderProduct(
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

  function getCouponDiscountValue() {
    const coupon = orderRelations.cupom as ICupom;

    switch (coupon.tipo) {
      case TipoCupom.ENTREGA:
        return orderRelations.preco_entrega;
      case TipoCupom.PEDIDO:
        return calculateSubTotalPrice(orderRelations) * (coupon.valor_desconto / 100);
      default:
        const exhaustiveCheck = coupon.tipo;
        return exhaustiveCheck;
    }
  }

  function getDeliveryType(deliveryType: TipoEntrega) {
    switch (deliveryType) {
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
    <Modal onClose={onClose}>
      <OrdersModalTitle>Pedido {orderRelations.id_pedido}</OrdersModalTitle>
      <ProductsListContainer>
        {orderRelations.pedido_produto.map((orderProduct) => (
          <li key={orderProduct.id_pedido_produto}>
            <ItemDescriptionContainer>
              <span>{`${orderProduct.quantidade} x`}</span>
              <p>{`${orderProduct.produto?.nome} - ${orderProduct.produto?.tamanho}`}</p>
              <TrashPriceContainer>
                <TrashPriceText>
                  {getNumberAsCurrency(orderProduct.produto?.preco_padrao as number)}
                </TrashPriceText>
              </TrashPriceContainer>
            </ItemDescriptionContainer>

            {orderRelations.pedido_produto_adicional.length > 0 && (
              <AddsListContainer>
                {getAddsInOrderProduct(orderProduct.id_pedido, orderProduct.id_produto).map(
                  (add) => (
                    <AddsText key={`add-${add.id_adicional}`}>
                      Adicional: {add.nome} <span>{getNumberAsCurrency(add.preco)}</span>
                    </AddsText>
                  )
                )}

                {orderRelations.pedido_produto_sabor.length > 0 && (
                  <OrderFlavorsText>
                    {"Sabores: ".concat(
                      getStringFlavorsInOrderProduct(
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
      </ProductsListContainer>

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
              Valor: <span>{getNumberAsCurrency(getCouponDiscountValue())}</span>
            </ColoredText>
          </CoupomDataContainer>
        )}

        <SubtotalText>
          Tipo de entrega: <span>{getDeliveryType(orderRelations.tipo_entrega)}</span>
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
            <AddresComplement>Complemento: {orderRelations.endereco.complemento}</AddresComplement>
          )}
        </OrdersAddresContainer>
      )}

      <TotalContainer>
        <TotalText>
          Total: <span>{getNumberAsCurrency(calculateTotalPrice(orderRelations))}</span>
        </TotalText>
      </TotalContainer>
    </Modal>
  );
};

export default OrderDetailsModal;
