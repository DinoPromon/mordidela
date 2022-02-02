import { CartFormValues } from "./index";

export const getCartFormInitialValues = () => {
  const cartFormInitialValues: CartFormValues = {
    delivery_type: null,
    address_id: null,
    payment_amount: "",
    payment_type: null,
    delivery_price: null,
    needChange: null,
    cupom: null,
  };

  return cartFormInitialValues;
};
