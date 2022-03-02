import type { ISignUpFormValues } from "../FormModel";

type SignUpFormArg = {
  name: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmedPassword: string;
};

export function getLoginFormArg(values: ISignUpFormValues): SignUpFormArg {
  return {
    name: values.name,
    birthDate: values.birthDate,
    phoneNumber: values.phoneNumber,
    email: values.email,
    password: values.password,
    confirmedPassword: values.confirmedPassword,
  };
}