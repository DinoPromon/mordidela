import { Validation } from "@my-types/validation";

export const passwordValidation: Validation = (password: string) => {
  const regex = /\d+/g;

  return password.trim().length > 8 && !!password.match(regex);
};

export const arePasswordsEquals = (password1: string, password2: string) => {
  return password1 === password2;
};

export const confirmedPasswordValidation: Validation = (password: string, confirmedPassword?: string) => {
  return arePasswordsEquals(password, confirmedPassword || "");
};
