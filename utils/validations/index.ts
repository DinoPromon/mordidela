import {
  UserFormValidations,
  AddressFormValidations,
  LoginFormValidations,
  GeneralDataFormValidations,
} from "@my-types/validation";
import { AddressFormData, UserFormData } from "@my-types/forms";

import { nameValidation } from "./name";
import { phoneValidation } from "./phone";
import { dateValidation } from "./date";
import { emailValidation } from "./email";
import { passwordValidation, confirmedPasswordValidation, arePasswordsEquals } from "./password";
import { complementValidation } from "./complement";

export {
  nameValidation,
  phoneValidation,
  dateValidation,
  emailValidation,
  passwordValidation,
  confirmedPasswordValidation,
  arePasswordsEquals,
  complementValidation,
};

export const userFormValidations: UserFormValidations = {
  nome: nameValidation,
  data_nascimento: dateValidation,
  telefone: phoneValidation,
  email: emailValidation,
  senha: passwordValidation,
  senha_confirmada: confirmedPasswordValidation,
};

export const addressFormValidations: AddressFormValidations = {
  logradouro: nameValidation,
  numero: nameValidation,
  bairro: nameValidation,
  complemento: complementValidation,
};

export const loginFormValidations: LoginFormValidations = {
  email: emailValidation,
  senha: passwordValidation,
};

export const generalDataValidation: GeneralDataFormValidations = {
  nome: nameValidation,
  data_nascimento: dateValidation,
  telefone: phoneValidation,
};

export const hasErrorInUserForm = (userFormData: UserFormData) => {
  for (const k in userFormData) {
    const key = k as keyof UserFormData;
    const isValid = userFormValidations[key](userFormData[key], userFormData["senha_confirmada"]);
    // se preciso mostrar o campo errado, trocar hasError para key
    if (!isValid) return true;
  }

  return false;
};

export const hasErrorInAddressForm = (addressFormData: AddressFormData) => {
  for (const k in addressFormData) {
    const key = k as keyof AddressFormData;
    const isValid = addressFormValidations[key](addressFormData[key] as string);
    if (!isValid) return true;
  }

  return false;
};
