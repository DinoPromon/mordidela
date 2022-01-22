import React, { Fragment, useContext, useState } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import { useFormikContext } from "formik";
import { CartFormValues } from "@components/Cart";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CartContext } from "@store/cart";
import { CustomFade } from "@components/shared";
import { CartChangeSelectContainer } from "./styled";

enum NeedChange {
  YES = "yes",
  NO = "no",
}

const CartChangeSelect: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<CartFormValues>();
  const [selectedNeedChange, setSelectedNeedChange] = useState<NeedChange | null>(() => {
    if (values.needChange) return NeedChange.YES;
    if (values.needChange === false) return NeedChange.NO;
    return null;
  });
  const { setPaymentAmount } = useContext(CartContext);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value as NeedChange;
    setSelectedNeedChange(value);

    if (value === NeedChange.NO) {
      setFieldValue("needChange", false);
      setPaymentAmount(0);
      return;
    }
    setFieldValue("needChange", true);
  }

  return (
    <Fragment>
      <CustomFade triggerAnimation={values.payment_type === "dinheiro"}>
        <CartChangeSelectContainer>
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
              value={NeedChange.YES}
              control={<Radio color="secondary" />}
            />
            <FormControlLabel
              label="Não"
              key="need-change-no"
              value={NeedChange.NO}
              control={<Radio color="secondary" />}
            />
          </RadioGroup>
        </CartChangeSelectContainer>
      </CustomFade>
    </Fragment>
  );
};

export default CartChangeSelect;
