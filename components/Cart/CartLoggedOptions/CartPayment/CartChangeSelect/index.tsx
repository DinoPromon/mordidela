import React, { Fragment, useContext, useState } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CartChangeSelectContainer } from "./styled";
import useFadeAnimation from "@hooks/useFadeAnimation";
import { CartContext } from "@store/cart";

type Props = {
  shoulShowChangeSelect: boolean;
};

enum NeedChangeInput {
  YES = "yes",
  NO = "no",
}

const CartChangeSelect: React.FC<Props> = (props) => {
  const [selectedNeedChange, setSelectedNeedChange] = useState<NeedChangeInput | null>(null);
  const { setPaymentAmount, setNeedChange } = useContext(CartContext);
  const showComponent = useFadeAnimation(props.shoulShowChangeSelect);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value as NeedChangeInput;
    setSelectedNeedChange(value);

    if (value === NeedChangeInput.NO) {
      setNeedChange(false);
      setPaymentAmount(0);
      return;
    }
    setNeedChange(true);
  }

  return (
    <Fragment>
      {showComponent && (
        <CartChangeSelectContainer shouldShowComponent={props.shoulShowChangeSelect}>
          <h3>Precisa de troco? </h3>
          <RadioGroup
            row
            name="input-need-change"
            value={selectedNeedChange}
            onChange={changeHandler}
          >
            <FormControlLabel
              label="Sim"
              key="need-change-yes"
              value={NeedChangeInput.YES}
              control={<Radio color="secondary" />}
            />
            <FormControlLabel
              label="Não"
              key="need-change-no"
              value={NeedChangeInput.NO}
              control={<Radio color="secondary" />}
            />
          </RadioGroup>
        </CartChangeSelectContainer>
      )}
    </Fragment>
  );
};

export default CartChangeSelect;
