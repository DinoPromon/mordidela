import { Validation } from "@my-types/validation";

export const nameValidation: Validation = (name: string) => {
  return name.trim().length > 0;
};