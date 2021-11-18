import { LoginFormData } from "./login";
import { AddressFormData, GeneralDataForm, UserFormData } from "./forms";

export type Validation = (x: string, y?: string) => boolean;

export type UserFormValidations = {
  [key in keyof UserFormData]: Validation;
};

export type AddressFormValidations = {
  [key in keyof AddressFormData]: Validation;
};

export type LoginFormValidations = {
  [key in keyof LoginFormData]: Validation;
};

export type GeneralDataFormValidations = {
  [key in keyof GeneralDataForm]: Validation;
};
