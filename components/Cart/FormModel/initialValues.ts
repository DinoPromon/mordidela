import { CartFormValues } from "./index";

export const getCartFormInitialValues = () => {
  const cartFormInitialValues: CartFormValues = {
    delivery_type: null,
    address_id: null,
    cupom_id: null,
    payment_amount: "",
    payment_type: null,
    needChange: null,
  };

  return cartFormInitialValues;
};
