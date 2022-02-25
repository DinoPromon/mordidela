import React from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useFormikContext } from "formik";
import { CartDeliveryTypeContainer } from "./styled";

import type { CartFormValues } from "../FormModel";

const CartDeliveryType: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<CartFormValues>();

  function deliveryTypeChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const deliveryType = event.target.value;
    setFieldValue("delivery_type", deliveryType);
    if (deliveryType === "balcao") {
      setFieldValue("delivery_price", 0);
      setFieldValue("address_id", null);
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
