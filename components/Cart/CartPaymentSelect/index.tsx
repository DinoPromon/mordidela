import React from "react";
import { faCreditCard, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Wrapper from "./styled";
import { PURPLE } from "@utils/colors";

const CartPaymentSelect: React.FC = () => {
  return (
    <Wrapper>
      <h3>Como vai ser o pagamento?</h3>
      <div>
        <label htmlFor="debito">
            <div>
              <FontAwesomeIcon icon={faCreditCard} size="sm" color={PURPLE} />
            </div>
          Débito
          <input type="radio" id="debito" name="input-tipo-pagamento" value="debito" />
          <span></span>
        </label>
        <label htmlFor="credito">
          <div>
              <FontAwesomeIcon icon={faCreditCard} size="sm" color={PURPLE} />
          </div>
          Crédito
          <input type="radio" id="credito" name="input-tipo-pagamento" value="credito" />
          <span></span>
        </label>
        <label htmlFor="dinheiro">
          <div>
              <FontAwesomeIcon icon={faMoneyBillWave} size="sm" color={PURPLE} />
          </div>
          Dinheiro
          <input type="radio" id="dinheiro" name="input-tipo-pagamento" value="dinheiro" />
          <span></span>
        </label>
      </div>
    </Wrapper>
  );
};

export default CartPaymentSelect;
