import React, { useContext } from "react";

import Wrapper from "./styled";
import { CartContext } from "@store/cart";
import { CartOrder } from "@my-types/context";
import { InputRadio } from "@components/shared";

const CartDeliveryType: React.FC = () => {
  const { setOrderType, order } = useContext(CartContext);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const type = event.target.value as CartOrder["order_type"];
    setOrderType(type);
  }

  const inputName = "input-tipo-entrega";

  return (
    <Wrapper>
      <InputRadio
        id="entrega"
        name={inputName}
        onChange={changeHandler}
        value="entrega"
        defaultCheked={order.order_type === "entrega"}
      >
        Delivery
      </InputRadio>
      <InputRadio
        id="balcao"
        name={inputName}
        onChange={changeHandler}
        value="balcao"
        defaultCheked={order.order_type === "balcao"}
      >
        Balcão
      </InputRadio>
    </Wrapper>
  );
};

export default CartDeliveryType;
