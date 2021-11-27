import React, { useContext } from "react";
import { faCreditCard, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Wrapper from "./styled";
import { CartContext } from "@store/cart";
import { PURPLE } from "@utils/colors";
import { CartOrder } from "@my-types/context";

type Props = {
  onSetShowChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartPaymentSelect: React.FC<Props> = (props) => {
  const { setPaymentType } = useContext(CartContext);

  function changePaymentType(event: React.ChangeEvent<HTMLInputElement>) {
    const { value: type } = event.target as { value: CartOrder["payment_type"] };
    setPaymentType(type);
    props.onSetShowChange(type === "dinheiro");
  }

  return (
    <Wrapper>
      <h3>Como vai ser o pagamento?</h3>
      <div>
        <label htmlFor="debito">
          <div>
            <FontAwesomeIcon icon={faCreditCard} size="sm" color={PURPLE} />
          </div>
          Débito
          <input
            type="radio"
            id="debito"
            name="input-tipo-pagamento"
            value="debito"
            onChange={changePaymentType}
          />
          <span></span>
        </label>
        <label htmlFor="credito">
          <div>
            <FontAwesomeIcon icon={faCreditCard} size="sm" color={PURPLE} />
          </div>
          Crédito
          <input
            type="radio"
            id="credito"
            name="input-tipo-pagamento"
            value="credito"
            onChange={changePaymentType}
          />
          <span></span>
        </label>
        <label htmlFor="dinheiro">
          <div>
            <FontAwesomeIcon icon={faMoneyBillWave} size="sm" color={PURPLE} />
          </div>
          Dinheiro
          <input
            type="radio"
            id="dinheiro"
            name="input-tipo-pagamento"
            value="dinheiro"
            onChange={changePaymentType}
          />
          <span></span>
        </label>
      </div>
    </Wrapper>
  );
};

export default CartPaymentSelect;
