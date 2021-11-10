import { UserFormData } from "./signup";

export type Validation = (x: string) => boolean;

export type UserFormValidations = {
  [key in keyof UserFormData]: Validation
};
