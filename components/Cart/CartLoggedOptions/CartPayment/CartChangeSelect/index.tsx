import React, { Fragment, useContext } from "react";

import Wrapper from "./styled";
import useFadeAnimation from "@hooks/useFadeAnimation";
import { CartContext } from "@store/cart";
import { InputRadio } from "@components/shared";

type Props = {
  onSetNeedChange: React.Dispatch<React.SetStateAction<boolean>>;
  shoulShowChangeSelect: boolean;
};

const CartChangeSelect: React.FC<Props> = (props) => {
  const { setPaymentAmount, order } = useContext(CartContext);
  const showComponent = useFadeAnimation(props.shoulShowChangeSelect);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target as { value: "no" | "yes" };
    if (value === "no") {
      props.onSetNeedChange(false);
      setPaymentAmount(0);
    } else props.onSetNeedChange(true);
  }

  const inputName = "input-tipo-troco";

  return (
    <Fragment>
      {showComponent && (
        <Wrapper shouldShowComponent={props.shoulShowChangeSelect}>
          <h3>Precisa de troco? </h3>
          <InputRadio
            id="nao"
            name={inputName}
            value="no"
            onChange={changeHandler}
            defaultCheked={(order.payment_amount as number) === 0}
          >
            Não
          </InputRadio>
          <InputRadio
            id="sim"
            name={inputName}
            value="yes"
            onChange={changeHandler}
            defaultCheked={(order.payment_amount as number) > 0}
          >
            Sim
          </InputRadio>
        </Wrapper>
      )}
    </Fragment>
  );
};

export default CartChangeSelect;
