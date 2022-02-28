import type { ISignUpFormValues } from "./index";

export function getSignUpInitialValues(): ISignUpFormValues {
  return {
    name: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmedPassword: "",
  };
}