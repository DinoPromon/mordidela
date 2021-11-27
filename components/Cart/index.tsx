import React, { useContext, Fragment, useState } from "react";

import CustomForm from "./styled";
import CartOrdersList from "./CartOrdersList";
import CartCupom from "./CartCupom";
import CartDeliveryType from "./CartDeliveryType";
import CartEmptyMessage from "./CartEmptyMessage";
import CartPayment from "./CartPayment";
import { CartContext } from "@store/cart";
import { FormButton } from "@components/shared";
import { transformPriceToString } from "@utils/transformation/price";

const Cart: React.FC = () => {
  const { products, order } = useContext(CartContext);
  const [isPaymentOk, setIsPaymentOk] = useState(false);

  const canSubmit = isPaymentOk && order.order_type !== undefined;

  function getSubTotalPrice() {
    return products.reduce((acc, cur) => (acc += cur.total_price), 0);
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const subTotalPrice = getSubTotalPrice();
  const totalPrice = subTotalPrice + 3.5;

  return (
    <CustomForm onSubmit={submitHandler}>
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
          <CartPayment totalPrice={totalPrice} onSetIsPaymentOk={setIsPaymentOk}/>
          <p>
            Total: <span>R$ {transformPriceToString(totalPrice)}</span>
          </p>
          <FormButton type="submit" disabled={!canSubmit}>Finalizar pedido</FormButton>
        </Fragment>
      )}
    </CustomForm>
  );
};

export default Cart;
