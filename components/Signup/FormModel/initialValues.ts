import type { SignupCompleteFormValues } from "./index";

export function getSignupCompleteInitialValues(): SignupCompleteFormValues {
  return {
    address: "",
    number: "",
    neighborhood: "",
    complement: "",
    name: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmedPassword: "",
    isAddressForm: false,
  };
}
