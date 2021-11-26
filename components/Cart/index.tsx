import React, { useContext, Fragment } from "react";

import CartOrdersList from "./CartOrdersList";
import CartCupom from "./CartCupom";
import CartDeliveryType from "./CartDeliveryType";
import CartEmptyMessage from "./CartEmptyMessage";
import { CartContext } from "@store/cart";
import { FormButton } from "@components/shared";

import CustomForm from "./styled";
import { transformPriceToString } from "@utils/transformation/price";
import CartPaymentSelect from "./CartPaymentSelect";
import CartTroco from "./CartTroco";
import CartPaymentValue from "./CartPaymentValue";

const Cart: React.FC = () => {
  const cartCtx = useContext(CartContext);
  const products = cartCtx.products;

  function getSubTotalPrice() {
    return products.reduce((acc, cur) => {
      const standardPrice = cur.standard_price;
      const addsPrice = cur.adds.reduce((accAdd, curAdd) => (accAdd += curAdd.preco), 0);
      return (acc += (standardPrice + addsPrice) * cur.quantity);
    }, 0);
  }

  const subTotalPrice = getSubTotalPrice();
  const totalPrice = subTotalPrice + 3.5;

  return (
    <CustomForm>
      {!products.length ? (
        <CartEmptyMessage />
      ) : (
        <Fragment>
          <h2>Seu pedido</h2>
          <CartDeliveryType />
          <CartOrdersList products={products} />
          <p>
            Subtotal: <span>R$ {transformPriceToString(subTotalPrice)}</span>
          </p>
          <p>
            Entrega: <span>R$ 3,50</span>
          </p>
          <CartCupom />
          <CartPaymentSelect />
          <CartTroco />
          <CartPaymentValue />
          <p>
            Total: <span>R$ {transformPriceToString(totalPrice)}</span>
          </p>
          <FormButton type="submit">Finalizar pedido</FormButton>
        </Fragment>
      )}
    </CustomForm>
  );
};

export default Cart;
