import { Validation } from "@my-types/validation";

export const emailValidation: Validation = (email: string) => {
  const regex = /^[\w][\w\d.]+@([\w]{3,}).([\w.]{3,})/;

  return !!email.trim().match(regex);
};

export const passwordValidation: Validation = (password: string) => {
  const regex = /\d+/g;

  return password.trim().length > 8 && !!password.match(regex);
};

export const nameValidation: Validation = (name: string) => {
  return name.trim().length > 0;
};
