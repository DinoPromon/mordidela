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

const phoneValidation = (phone: string) => {
  const phoneRegex = /^\d{11}$/;
  if(isNaN(parseInt(phone))) return false;
  if(!phoneRegex.test(phone)) return false;
  return true;
};

const dateValidation: Validation = (date: string) => {
  const [day, month, year] = date.split("/").map((value) => parseInt(value));
  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;

  const dateAsTimestamp = Date.parse(`${year}-${month}-${day}`);

  if (isNaN(dateAsTimestamp)) return false;

  if (dateAsTimestamp > Date.now()) return false;

  return true;
};

const complementValidation: Validation = (complement: string) => {
  return true;
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
