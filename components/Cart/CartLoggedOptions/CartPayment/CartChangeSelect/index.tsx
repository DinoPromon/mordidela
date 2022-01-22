import React, { Fragment, useContext, useState } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import { useFormikContext } from "formik";
import { CartFormValues } from "@components/Cart";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CartChangeSelectContainer } from "./styled";
import useFadeAnimation from "@hooks/useFadeAnimation";
import { CartContext } from "@store/cart";

enum NeedChangeInput {
  YES = "yes",
  NO = "no",
}

const CartChangeSelect: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<CartFormValues>();
  const [selectedNeedChange, setSelectedNeedChange] = useState<NeedChangeInput | null>(
    values.needChange ? NeedChangeInput.YES : NeedChangeInput.NO
  );
  const { setPaymentAmount } = useContext(CartContext);
  const shouldShowChangeSelect = useFadeAnimation(values.payment_type === "dinheiro");

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value as NeedChangeInput;
    setSelectedNeedChange(value);

    if (value === NeedChangeInput.NO) {
      setFieldValue("needChange", false);
      setPaymentAmount(0);
      return;
    }
    setFieldValue("needChange", true);
  }

  return (
    <Fragment>
      {shouldShowChangeSelect && (
        <CartChangeSelectContainer shouldShowComponent={shouldShowChangeSelect}>
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
