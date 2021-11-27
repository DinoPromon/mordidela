import React, { useEffect, useState, useContext } from "react";

import Wrapper from "./styled";
import CartPaymentSelect from "./CartPaymentSelect";
import CartPaymentValue from "./CartPaymentValue";
import CartChangeSelect from "./CartChangeSelect";
import { CartContext } from "@store/cart";

type Props = {
  totalPrice: number;
  onSetIsPaymentOk: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartPayment: React.FC<Props> = (props) => {
  const { order } = useContext(CartContext);
  const [needChange, setNeedChange] = useState(false);
  const [showChange, setShowChange] = useState(false);

  useEffect(() => {
    if (needChange) {
      if (showChange) return props.onSetIsPaymentOk((order.payment_amount as number) < props.totalPrice);
      return props.onSetIsPaymentOk(true);
    }
    console.log(order.payment_type);
    props.onSetIsPaymentOk(order.payment_type !== undefined);
  }, [needChange, showChange]);

  return (
    <Wrapper>
      <CartPaymentSelect onSetShowChange={setShowChange} />
      {showChange && <CartChangeSelect onSetNeedChange={setNeedChange} />}
      {needChange && <CartPaymentValue totalPrice={props.totalPrice} />}
    </Wrapper>
  );
};

export default CartPayment;
