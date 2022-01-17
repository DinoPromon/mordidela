import React, { useContext } from "react";
import { FaRegCreditCard, FaMoneyBill } from "react-icons/fa/index.js";
import Wrapper from "./styled";
import { CartContext } from "@store/cart";
import { PURPLE } from "@utils/colors";
import { CartOrder } from "@my-types/context";
import { InputRadio } from "@components/shared";

const CartPaymentSelect: React.FC = (props) => {
  const { setPaymentType, order } = useContext(CartContext);

  function changePaymentType(event: React.ChangeEvent<HTMLInputElement>) {
    const { value: type } = event.target as { value: CartOrder["payment_type"] };
    setPaymentType(type);
  }

  const inputName = "input-tipo-pagamento";

  return (
    <Wrapper>
      <h3>Como vai ser o pagamento?</h3>
      <div>
        <InputRadio
          id="debito"
          name={inputName}
          value="debito"
          defaultCheked={order.payment_type === "debito"}
          onChange={changePaymentType}
        >
          <div>
            <FaRegCreditCard color={PURPLE} style={{ verticalAlign: "middle" }} size={19} />
          </div>
          Débito
        </InputRadio>
        <InputRadio
          id="credito"
          name={inputName}
          value="credito"
          defaultCheked={order.payment_type === "credito"}
          onChange={changePaymentType}
        >
          <div>
            <FaRegCreditCard color={PURPLE} style={{ verticalAlign: "middle" }} size={19} />
          </div>
          Crédito
        </InputRadio>
        <InputRadio
          id="dinheiro"
          name={inputName}
          value="dinheiro"
          defaultCheked={order.payment_type === "dinheiro"}
          onChange={changePaymentType}
        >
          <div>
            <FaMoneyBill color={PURPLE} style={{ verticalAlign: "middle" }} size={19} />
          </div>
          Dinheiro
        </InputRadio>
      </div>
    </Wrapper>
  );
};

export default CartPaymentSelect;
