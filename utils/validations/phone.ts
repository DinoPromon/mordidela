import { Validation } from "@my-types/validation";
import { clearPhoneNumber } from "@utils/transformation";

export const phoneValidation: Validation = (phone: string) => {
  const phoneRegex = /\d{11}/g;
  if (!phoneRegex.test(clearPhoneNumber(phone))) return false;
  return true;
};
