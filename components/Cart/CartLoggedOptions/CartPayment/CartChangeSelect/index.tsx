import React, { Fragment, useContext, useState } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Wrapper from "./styled";
import { radioStyles } from "@components/shared/CustomMui";
import useFadeAnimation from "@hooks/useFadeAnimation";
import { CartContext } from "@store/cart";

type Props = {
  onSetNeedChange: React.Dispatch<React.SetStateAction<boolean>>;
  shoulShowChangeSelect: boolean;
};

enum NeedChange {
  YES = "yes",
  NO = "no",
}

const CartChangeSelect: React.FC<Props> = (props) => {
  const radioClasses = radioStyles();
  const [selectedNeedChange, setSelectedNeedChange] = useState<NeedChange | null>(null);
  const { setPaymentAmount, order } = useContext(CartContext);
  const showComponent = useFadeAnimation(props.shoulShowChangeSelect);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value as NeedChange;
    setSelectedNeedChange(value);

    if (value === NeedChange.NO) {
      props.onSetNeedChange(false);
      setPaymentAmount(0);
      return;
    }
    props.onSetNeedChange(true);
  }

  return (
    <Fragment>
      {showComponent && (
        <Wrapper shouldShowComponent={props.shoulShowChangeSelect}>
          <h3>Precisa de troco? </h3>
          <RadioGroup row name="input-need-change" value={selectedNeedChange} onChange={changeHandler}>
            <FormControlLabel
              label="Sim"
              key="need-change-yes"
              value={NeedChange.YES}
              control={<Radio classes={radioClasses} />}
            />
            <FormControlLabel
              label="Não"
              key="need-change-yes"
              value={NeedChange.NO}
              control={<Radio classes={radioClasses} />}
            />
          </RadioGroup>
        </Wrapper>
      )}
    </Fragment>
  );
};

export default CartChangeSelect;
