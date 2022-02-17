import React from "react";
import CartItemDescription from "./CartItemDescription";
import { transformPriceToString } from "@utils/transformation";
import { ProductsListContainer, AddsListContainer,AddsText } from "@components/shared/SharedStyledComponents";

import type { CartProduct } from "@my-types/context";

type Props = {
  products: CartProduct[];
};

const CartOrdersList: React.FC<Props> = (props) => {
  const { products } = props;

  function getFlavorsAsString(product: CartProduct) {
    const flavorsString = product.flavors.reduce((string, cur, index) => {
      if (index < product.flavors.length - 1) {
        return (string += `${cur.nome}, `);
      }
      return (string += `${cur.nome}`);
    }, "");

    return flavorsString;
  }

  return (
    <ProductsListContainer>
      {products.map((product) => (
        <li key={product.key}>
          <CartItemDescription
            productKey={product.key}
            productName={product.name}
            productSize={product.size}
            quantity={product.quantity}
            standard_price={product.standard_price}
          />
          <AddsListContainer>
            {product.adds.map((add) => (
              <AddsText key={`add-${add.id_adicional}`}>
                Adicional: {add.nome} <span>R$ {transformPriceToString(add.preco)}</span>
              </AddsText>
            ))}
            {!!product.flavors.length && <p>Sabores: {getFlavorsAsString(product)}</p>}
          </AddsListContainer>
        </li>
      ))}
    </ProductsListContainer>
  );
};

export default CartOrdersList;
