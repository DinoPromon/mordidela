import React, { useEffect, useContext } from "react";

import { CartPaymentContainer } from "./styled";
import CartPaymentSelect from "./CartPaymentSelect";
import CartPaymentValue from "./CartPaymentValue";
import CartChangeSelect from "./CartChangeSelect";
import { CartPaymentSelectProps } from "./CartPaymentSelect";
import { CartContext } from "@store/cart";

type Props = {
  totalPrice: number;
  onSetIsPaymentOk: React.Dispatch<React.SetStateAction<boolean>>;
} & CartPaymentSelectProps;

const CartPayment: React.FC<Props> = ({
  totalPrice,
  onSetIsPaymentOk,
  onSetPaymentType,
  selectedPaymentType,
}) => {
  const {
    order: { payment_amount, payment_type, needChange },
  } = useContext(CartContext);

  const shouldShowPaymentValue = needChange && payment_type === "dinheiro" ? true : false;

  useEffect(() => {
    if (payment_type === "dinheiro") {
      if (needChange) return onSetIsPaymentOk(payment_amount >= totalPrice);
      return onSetIsPaymentOk(true);
    }
    if (payment_type === null) return onSetIsPaymentOk(false);
    onSetIsPaymentOk(true);
  }, [needChange, payment_amount, payment_type, totalPrice, onSetIsPaymentOk]);

  return (
    <CartPaymentContainer>
      <CartPaymentSelect
        onSetPaymentType={onSetPaymentType}
        selectedPaymentType={selectedPaymentType}
      />
      <CartChangeSelect shoulShowChangeSelect={payment_type === "dinheiro"} />
      <CartPaymentValue shouldShowPaymentValue={shouldShowPaymentValue} />
    </CartPaymentContainer>
  );
};

export default CartPayment;
