import React, { useContext, Fragment } from "react";

import CartOrdersList from "./CartOrdersList";
import CartCupom from "./CartCupom";
import CartDeliveryType from "./CartDeliveryType";
import CartEmptyMessage from "./CartEmptyMessage";
import { CartContext } from "@store/cart";
import { FormButton } from "@components/shared";

import CustomForm from "./styled";

const Cart: React.FC = () => {
  const cartCtx = useContext(CartContext);
  const products = cartCtx.products;

  return (
    <CustomForm>
      {!products.length ? (
        <CartEmptyMessage />
      ) : (
        <Fragment>
          <h2>Seu pedido</h2>
          <CartDeliveryType />
          <CartOrdersList />
          <p>
            Subtotal: <span>R$ 30,40</span>
          </p>
          <p>
            Entrega: <span>R$ 3,50</span>
          </p>
          <CartCupom />
          <p>
            Total: <span>R$ 33,90</span>
          </p>
          <FormButton type="submit">Finalizar pedido</FormButton>
        </Fragment>
      )}
    </CustomForm>
  );
};

export default Cart;
