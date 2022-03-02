import React from "react";
import CartItemDescription from "./CartItemDescription";
import { transformPriceToString } from "@utils/transformation";
import {
  AddsText,
  ProductsContainer,
  AddsListContainer,
} from "@components/shared/StyledComponents";

import type { CartProduct } from "@my-types/context";

type Props = {
  products: CartProduct[];
};

const CartOrdersList: React.FC<Props> = ({ products }) => {
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
    <ProductsContainer>
      {products.map((product) => (
        <li key={product.key}>
          <CartItemDescription
            productKey={product.key}
            productName={product.name}
            productSize={product.size}
            quantity={product.quantity}
            standardPrice={product.standard_price}
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
    </ProductsContainer>
  );
};

export default CartOrdersList;
