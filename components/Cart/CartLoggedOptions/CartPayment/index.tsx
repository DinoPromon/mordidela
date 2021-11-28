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
  const {
    order: { payment_amount, payment_type },
  } = useContext(CartContext);
  const [needChange, setNeedChange] = useState(false);
  const [showChange, setShowChange] = useState(false);

  useEffect(() => {
    if (needChange) {
      if (showChange) return props.onSetIsPaymentOk((payment_amount as number) >= props.totalPrice);
      return props.onSetIsPaymentOk(true);
    }
    props.onSetIsPaymentOk(payment_type !== undefined);
  }, [needChange, showChange, payment_amount, payment_type]);

  return (
    <Wrapper>
      <CartPaymentSelect onSetShowChange={setShowChange} />
      {showChange && <CartChangeSelect onSetNeedChange={setNeedChange} />}
      {needChange && <CartPaymentValue totalPrice={props.totalPrice} />}
    </Wrapper>
  );
};

export default CartPayment;
