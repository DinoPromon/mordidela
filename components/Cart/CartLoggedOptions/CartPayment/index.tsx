import React from "react";
import CartPaymentValue from "./CartPaymentValue";
import CartChangeSelect from "./CartChangeSelect";
import CartPaymentSelect from "./CartPaymentSelect";
import { useFormikContext } from "formik";
import { TipoPagamento } from "@models/pedido";
import { CartPaymentContainer } from "./styled";
import { CartFormValues } from "@components/Cart/FormModel";


const CartPayment: React.FC = () => {
  const { values } = useFormikContext<CartFormValues>();

  const shouldShowPaymentValue =
    Boolean(values.needChange) && values.paymentType === TipoPagamento.DINHEIRO;

  return (
    <CartPaymentContainer>
      <CartPaymentSelect />
      <CartChangeSelect />
      <CartPaymentValue shouldShowPaymentValue={shouldShowPaymentValue} />
    </CartPaymentContainer>
  );
};

export default CartPayment;
