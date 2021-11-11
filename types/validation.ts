import { AddressFormData, UserFormData } from "./signup";

export type Validation = (x: string, y?: string) => boolean;

export type UserFormValidations = {
  [key in keyof UserFormData]: Validation;
};

export type AddressFormValidations = {
  [key in keyof AddressFormData]: Validation;
};
