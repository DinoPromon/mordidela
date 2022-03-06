import { clearPhoneNumber } from "@utils/transformation";

export const phoneValidation = (phone: string) => {
  const phoneRegex = /\d{11}/g;
  if (!phoneRegex.test(clearPhoneNumber(phone))) return false;
  return true;
};
