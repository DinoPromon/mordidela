import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useFormikContext } from "formik";
import { AnimatePresence, motion } from "framer-motion";

import { TipoPagamento } from "@models/pedido";
import { CartFadeVariant } from "@components/Cart/animations";
import { transformPriceToString } from "@utils/transformation";

import { CartChangeSelectContainer } from "./styled";

import type { CartFormValues } from "@components/Cart/FormModel";

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
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value as NeedChange;
    setSelectedNeedChange(value);

    if (value === NeedChange.NO) {
      setFieldValue("needChange", false);
      setFieldValue("paymentAmount", transformPriceToString(0));
      return;
    }
    setFieldValue("needChange", true);
  }

  return (
    <AnimatePresence>
      {values.paymentType === TipoPagamento.DINHEIRO && (
        <CartChangeSelectContainer
          as={motion.div}
          variants={CartFadeVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
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
      )}
    </AnimatePresence>
  );
};

export default CartChangeSelect;
