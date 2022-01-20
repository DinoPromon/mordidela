import React, { useContext } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { radioStyles } from "@components/shared/CustomMui";
import { CartDeliveryTypeContainer } from "./styled";
import { CartContext } from "@store/cart";
import { CartOrder } from "@my-types/context";

const CartDeliveryType: React.FC = () => {
  const radioClasses = radioStyles();
  const { setOrderType, order } = useContext(CartContext);

  function deliveryTypeChangeHandler(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    setOrderType(value as CartOrder["order_type"]);
  }

  return (
    <CartDeliveryTypeContainer>
      <RadioGroup row name="input-delivery-type" value={order.order_type} onChange={deliveryTypeChangeHandler}>
        <FormControlLabel
          label="Delivery"
          key="delivery-type-delivery"
          value="entrega"
          control={<Radio classes={radioClasses} />}
        />
        <FormControlLabel
          label="Balcão"
          key="delivery-type-balcao"
          value="balcao"
          control={<Radio classes={radioClasses} />}
        />
      </RadioGroup>
    </CartDeliveryTypeContainer>
  );
};

export default CartDeliveryType;
