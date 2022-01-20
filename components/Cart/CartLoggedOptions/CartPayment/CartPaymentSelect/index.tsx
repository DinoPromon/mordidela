import React, { useContext } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { radioStyles } from "@components/shared/CustomMui";
import { CartPaymentSelectContainer, CartPaymentSelectTitle, CartPaymentSelectContainerRadioGroup } from "./styled";
import { CartContext } from "@store/cart";
import { PURPLE } from "@utils/colors";
import { CartOrder } from "@my-types/context";
import { FaRegCreditCard, FaMoneyBill } from "react-icons/fa/index.js";

const CartPaymentSelect: React.FC = (props) => {
  const radioClasses = radioStyles();
  const { setPaymentType, order } = useContext(CartContext);

  function changePaymentTypeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { value: type } = event.target as { value: CartOrder["payment_type"] };
    setPaymentType(type);
  }

  const inputName = "input-tipo-pagamento";

  return (
    <CartPaymentSelectContainer>
      <CartPaymentSelectTitle>Como vai ser o pagamento?</CartPaymentSelectTitle>
      <CartPaymentSelectContainerRadioGroup>
        <RadioGroup row name="input-payment-type" value={order.payment_type} onChange={changePaymentTypeHandler}>
          <FormControlLabel
            label={
              <span>
                <FaRegCreditCard color={PURPLE} style={{ verticalAlign: "middle" }} size={19} /> Débito
              </span>
            }
            key="payment-type-debito"
            value="debito"
            control={<Radio classes={radioClasses} />}
          />
          <FormControlLabel
            label={
              <span>
                <FaRegCreditCard color={PURPLE} style={{ verticalAlign: "middle" }} size={19} /> Crédito
              </span>
            }
            key="payment-type-credito"
            value="credito"
            control={<Radio classes={radioClasses} />}
          />
          <FormControlLabel
            label={
              <span>
                <FaMoneyBill color={PURPLE} style={{ verticalAlign: "middle" }} size={19} /> Dinheiro
              </span>
            }
            key="payment-type-dinheiro"
            value="dinheiro"
            control={<Radio classes={radioClasses} />}
          />
        </RadioGroup>
      </CartPaymentSelectContainerRadioGroup>
    </CartPaymentSelectContainer>
  );
};

export default CartPaymentSelect;
