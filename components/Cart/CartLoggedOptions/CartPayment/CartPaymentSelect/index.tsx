import React, { useContext, useEffect } from "react";
import { useFormikContext } from "formik";
import { CartFormValues } from "@components/Cart";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  CartPaymentSelectContainer,
  CartPaymentSelectTitle,
  CartPaymentSelectContainerRadioGroup,
} from "./styled";
import { CartContext } from "@store/cart";
import { PURPLE } from "@utils/colors";
import { FaRegCreditCard, FaMoneyBill } from "react-icons/fa/index.js";

const CartPaymentSelect: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<CartFormValues>();
  const { setPaymentType } = useContext(CartContext);

  function changePaymentTypeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const paymentType = event.target.value;
    setFieldValue("payment_type", paymentType);
  }

  useEffect(() => {
    setPaymentType(values.payment_type);
  }, [values.payment_type, setPaymentType]);

  return (
    <CartPaymentSelectContainer>
      <CartPaymentSelectTitle>Como vai ser o pagamento?</CartPaymentSelectTitle>
      <CartPaymentSelectContainerRadioGroup>
        <RadioGroup
          row
          name="input-payment-type"
          value={values.payment_type}
          onChange={changePaymentTypeHandler}
        >
          <FormControlLabel
            label={
              <span>
                <FaRegCreditCard color={PURPLE} style={{ verticalAlign: "middle" }} size={19} />{" "}
                Débito
              </span>
            }
            key="payment-type-debito"
            value="debito"
            control={<Radio color="secondary" />}
          />
          <FormControlLabel
            label={
              <span>
                <FaRegCreditCard color={PURPLE} style={{ verticalAlign: "middle" }} size={19} />{" "}
                Crédito
              </span>
            }
            key="payment-type-credito"
            value="credito"
            control={<Radio color="secondary" />}
          />
          <FormControlLabel
            label={
              <span>
                <FaMoneyBill color={PURPLE} style={{ verticalAlign: "middle" }} size={19} />{" "}
                Dinheiro
              </span>
            }
            key="payment-type-dinheiro"
            value="dinheiro"
            control={<Radio color="secondary" />}
          />
        </RadioGroup>
      </CartPaymentSelectContainerRadioGroup>
    </CartPaymentSelectContainer>
  );
};

export default CartPaymentSelect;
