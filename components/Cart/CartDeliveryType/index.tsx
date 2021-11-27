import React, { useContext } from "react";

import Wrapper from "./styled";
import { CartContext } from "@store/cart";
import { CartOrder } from "@my-types/context";

const CartDeliveryType: React.FC = () => {
  const { setOrderType, order } = useContext(CartContext);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const type = event.target.value as CartOrder["order_type"];
    setOrderType(type);
  }

  return (
    <Wrapper>
      <label htmlFor="entrega">
        Delivery
        <input
          type="radio"
          id="entrega"
          name="input-tipo-entrega"
          value="entrega"
          onChange={changeHandler}
          defaultChecked={order.order_type === "entrega"}
        />
        <span></span>
      </label>
      <label htmlFor="balcao">
        Balcão
        <input
          type="radio"
          id="balcao"
          name="input-tipo-entrega"
          value="balcao"
          onChange={changeHandler}
          defaultChecked={order.order_type === "balcao"}
        />
        <span></span>
      </label>
    </Wrapper>
  );
};

export default CartDeliveryType;
