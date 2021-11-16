import { Validation } from "@my-types/validation";

export const phoneValidation: Validation = (phone: string) => {
  const phoneRegex = /^\d{11}$/;
  if (isNaN(parseInt(phone))) return false;
  if (!phoneRegex.test(phone)) return false;
  return true;
};