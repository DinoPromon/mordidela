import React, { useContext } from "react";
import { useFormikContext } from "formik";
import { CartFormValues } from "@components/Cart";
import { CartPaymentContainer } from "./styled";
import CartPaymentSelect from "./CartPaymentSelect";
import CartPaymentValue from "./CartPaymentValue";
import CartChangeSelect from "./CartChangeSelect";
import { CartContext } from "@store/cart";

const CartPayment: React.FC = () => {
  const { values } = useFormikContext<CartFormValues>();
  const {
    order: { payment_type },
  } = useContext(CartContext);

  const shouldShowPaymentValue = Boolean(values.needChange) && values.payment_type === "dinheiro";

  return (
    <CartPaymentContainer>
      <CartPaymentSelect />
      <CartChangeSelect />
      <CartPaymentValue shouldShowPaymentValue={shouldShowPaymentValue} />
    </CartPaymentContainer>
  );
};

export default CartPayment;
