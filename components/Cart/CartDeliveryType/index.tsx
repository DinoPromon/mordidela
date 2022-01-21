import React, { useContext, useEffect } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CartDeliveryTypeContainer } from "./styled";
import { CartContext } from "@store/cart";

type Props = {
  selectedDeliveryType: string | null;
  onSetDeliveryType: (deliveryType: string | null) => void;
};

const CartDeliveryType: React.FC<Props> = ({ onSetDeliveryType, selectedDeliveryType }) => {
  const { setDeliveryType } = useContext(CartContext);

  function deliveryTypeChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const deliveryType = event.target.value;
    onSetDeliveryType(deliveryType);
  }

  useEffect(() => {
    setDeliveryType(selectedDeliveryType);
  }, [selectedDeliveryType, setDeliveryType]);

  return (
    <CartDeliveryTypeContainer>
      <RadioGroup
        row
        name="input-delivery-type"
        value={selectedDeliveryType}
        onChange={deliveryTypeChangeHandler}
      >
        <FormControlLabel
          label="Delivery"
          key="delivery-type-delivery"
          value="entrega"
          control={<Radio color="secondary" />}
        />
        <FormControlLabel
          label="Balcão"
          key="delivery-type-balcao"
          value="balcao"
          control={<Radio color="secondary" />}
        />
      </RadioGroup>
    </CartDeliveryTypeContainer>
  );
};

export default CartDeliveryType;
