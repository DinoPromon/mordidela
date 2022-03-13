import React from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useFormikContext } from "formik";
import { TipoEntrega } from "@models/pedido";
import { CartDeliveryTypeContainer } from "./styled";

import type { CartFormValues } from "../FormModel";

const CartDeliveryType: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<CartFormValues>();

  function deliveryTypeChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const deliveryType = event.target.value;
    setFieldValue("deliveryType", deliveryType);
    if (deliveryType === TipoEntrega.BALCAO) {
      setFieldValue("deliveryPrice", 0);
      setFieldValue("addressId", null);
    }
  }

  return (
    <CartDeliveryTypeContainer>
      <h4>Como vai ser o tipo de entrega?</h4>
      <RadioGroup
        row
        name="input-delivery-type"
        value={values.deliveryType}
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
