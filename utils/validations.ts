import {
  Validation,
  UserFormValidations,
  AddressFormValidations,
  LoginFormValidations,
} from "@my-types/validation";

const emailValidation: Validation = (email: string) => {
  const regex = /^[\w][\w\d.]+@([\w]{3,}).([\w.]{3,})/;

  return !!email.trim().match(regex);
};

const passwordValidation: Validation = (password: string) => {
  const regex = /\d+/g;

  return password.trim().length > 8 && !!password.match(regex);
};

const nameValidation: Validation = (name: string) => {
  return name.trim().length > 0;
};

const confirmedPasswordValidation: Validation = (password: string, confirmedPassword?: string) => {
  return password === confirmedPassword;
};

const complementValidation: Validation = (complement: string) => {
  return true;
};

export const userFormValidations: UserFormValidations = {
  nome: nameValidation,
  data_nascimento: nameValidation,
  telefone: nameValidation,
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
