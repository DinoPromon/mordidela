import React, { useContext } from "react";

import Wrapper from "./styled";
import { CartContext } from "@store/cart";

type Props = {
  onSetNeedChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartChangeSelect: React.FC<Props> = (props) => {
  const { setPaymentAmount } = useContext(CartContext);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target as { value: "no" | "yes" };
    if (value === "no") {
      props.onSetNeedChange(false);
      setPaymentAmount(0);
    } else props.onSetNeedChange(true);
  }
  
  return (
    <Wrapper>
      <h3>Precisa de troco? </h3>
      <label htmlFor="nao">
        Não
        <input type="radio" id="nao" name="input-tipo-troco" value="no" onChange={changeHandler} />
        <span></span>
      </label>
      <label htmlFor="sim">
        Sim
        <input type="radio" id="sim" name="input-tipo-troco" value="yes" onChange={changeHandler} />
        <span></span>
      </label>
    </Wrapper>
  );
};

export default CartChangeSelect;
