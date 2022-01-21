import React, { useContext, useEffect } from "react";
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

export type CartPaymentSelectProps = {
  selectedPaymentType: string | null;
  onSetPaymentType: (paymentType: string | null) => void;
};

const CartPaymentSelect: React.FC<CartPaymentSelectProps> = ({
  onSetPaymentType,
  selectedPaymentType,
}) => {
  const { setPaymentType } = useContext(CartContext);

  function changePaymentTypeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const paymentType = event.target.value;
    onSetPaymentType(paymentType);
  }

  useEffect(() => {
    setPaymentType(selectedPaymentType);
  }, [selectedPaymentType, setPaymentType]);

  return (
    <CartPaymentSelectContainer>
      <CartPaymentSelectTitle>Como vai ser o pagamento?</CartPaymentSelectTitle>
      <CartPaymentSelectContainerRadioGroup>
        <RadioGroup
          row
          name="input-payment-type"
          value={selectedPaymentType}
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
