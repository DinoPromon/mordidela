import React, { useContext } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useFormikContext } from "formik";
import { CartContext } from "@store/cart";
import { CartDeliveryTypeContainer } from "./styled";

import type { CartFormValues } from "../FormModel";

const CartDeliveryType: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<CartFormValues>();
  const { setDeliveryType, setDeliveryPrice, setAddressId } = useContext(CartContext);

  function deliveryTypeChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const deliveryType = event.target.value;
    setFieldValue("delivery_type", deliveryType);
    setDeliveryType(deliveryType);
    if (deliveryType === "balcao") {
      setDeliveryPrice(0);
      setAddressId(null);
    }
  }

  return (
    <CartDeliveryTypeContainer>
      <RadioGroup
        row
        name="input-delivery-type"
        value={values.delivery_type}
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
