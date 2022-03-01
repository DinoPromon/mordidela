import type { CartFormValues } from "./index";

export const getCartFormInitialValues = () => {
  const cartFormInitialValues: CartFormValues = {
    deliveryType: null,
    addressId: null,
    paymentAmount: "",
    paymentType: null,
    deliveryPrice: null,
    needChange: null,
    coupon: null,
  };

  return cartFormInitialValues;
};
