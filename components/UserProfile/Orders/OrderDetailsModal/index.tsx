import React, { Fragment } from "react";
import { Modal } from "@components/shared";
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

import type IPedido from "@models/pedido";
import type IProduto from "@models/produto";
import type IAdicional from "@models/adicional";
import type { IOrderRelations } from "@models/pedido";

type OrderDetailsModalProps = {
  onClose: () => void;
  orderRelations: IOrderRelations;
};

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ orderRelations, onClose }) => {
  function getNumberAsCurrency(number: number) {
    const formatedDefaultPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(number);

    return formatedDefaultPrice;
  }

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

  function calculateTotalAddsPrice(
    orderId: IPedido["id_pedido"],
    productId: IProduto["id_produto"]
  ) {
    const filteredOrderProductAdds = filterOrderProductAdds(orderId, productId);
    const addsTotalPrice = filteredOrderProductAdds.reduce(
      (totalPrice, orderProductAdd) =>
        totalPrice + Number(orderProductAdd.adicional?.preco as number),
      0
    );

    return addsTotalPrice;
  }

  function calculateSubTotalPrice() {
    const subtTotalPrice = orderRelations.pedido_produto.reduce((totalPrice, orderProduct) => {
      const product = orderProduct.produto as IProduto;
      const addsTotalPrice = calculateTotalAddsPrice(
        orderProduct.id_pedido,
        orderProduct.id_produto
      );

      return totalPrice + product.preco_padrao + addsTotalPrice;
    }, 0);

    return subtTotalPrice;
  }

  return (
    <Modal onClose={onClose}>
      <OrdersModalTitle>Pedido {orderRelations.id_pedido}</OrdersModalTitle>
      <ProductsListContainer>
        {orderRelations.pedido_produto.map((orderProduct) => (
          <Fragment key={`order-product${orderProduct.id_pedido_produto}`}>
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
          </Fragment>
        ))}
      </ProductsListContainer>

      <OrdersDataContainer>
        <SubtotalText>
          Subtotal: <span>{getNumberAsCurrency(calculateSubTotalPrice())}</span>
        </SubtotalText>
        <CoupomDataContainer>
          <ColoredText>
            Cupom: <span>TESTE</span>
          </ColoredText>
          <ColoredText>
            Desconto: <span>10%</span>
          </ColoredText>
          <ColoredText>
            Valor: <span>R$ 3,19</span>
          </ColoredText>
        </CoupomDataContainer>
        <SubtotalText>
          Tipo de entrega: <span>Delivery</span>
        </SubtotalText>
        <SubtotalText>
          Taxa de entrega: <span>R$ 4,00</span>
        </SubtotalText>
        <SubtotalText>
          Tipo de pagamento: <span>Dinheiro (troco para R$ 50,00)</span>
        </SubtotalText>
      </OrdersDataContainer>

      <OrdersAddresContainer>
        <AddresTitle>Endereço de entrega</AddresTitle>
        <p>Rua dos Alfeneiros Nº 4, Little Whinging</p>
        <AddresComplement>Complemento: Casa</AddresComplement>
      </OrdersAddresContainer>

      <TotalContainer>
        <TotalText>
          Total: <span>R$ 32,71</span>
        </TotalText>
      </TotalContainer>
    </Modal>
  );
};

export default OrderDetailsModal;
