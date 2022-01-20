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

const CartPayment: React.FC<Props> = ({ totalPrice, onSetIsPaymentOk }) => {
  const {
    order: { payment_amount, payment_type },
  } = useContext(CartContext);
  const [needChange, setNeedChange] = useState((payment_amount as number) > 0);

  const showChangeSelect = payment_type === "dinheiro";
  const showPaymentValue = needChange && showChangeSelect;

  useEffect(() => {
    if (needChange) {
      if (showChangeSelect) return onSetIsPaymentOk((payment_amount as number) >= totalPrice);
      return onSetIsPaymentOk(true);
    }
    onSetIsPaymentOk(payment_type !== undefined);
  }, [needChange, showChangeSelect, payment_amount, payment_type, totalPrice, onSetIsPaymentOk]);

  return (
    <Wrapper>
      <CartPaymentSelect />
      <CartChangeSelect onSetNeedChange={setNeedChange} shoulShowChangeSelect={showChangeSelect} />
      <CartPaymentValue shouldShowPaymentValue={showPaymentValue} />
    </Wrapper>
  );
};

export default CartPayment;
