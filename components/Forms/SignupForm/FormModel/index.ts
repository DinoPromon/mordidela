import type { FormField } from "@my-types/form";

export interface ISignUpFormValues {
  name: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmedPassword: string;
};

export type SignUpFormModel = {
  [key in keyof ISignUpFormValues]: FormField<ISignUpFormValues>;
};

export function getSignUpFormModel() {
  const SignUpFormModel: SignUpFormModel = {
    name: {
      label: "Nome *",
      name: "name",
      requiredErrorMessage: "Insira seu nome",
    },
    birthDate: {
      label: "Data de nascimento *",
      name: "birthDate",
      requiredErrorMessage: "Insira sua data de nascimento",
    },
    phoneNumber: {
      label: "Telefone *",
      name: "phoneNumber",
      requiredErrorMessage: "Insira seu número de telefone",
    },
    email: {
      label: "Email *",
      name: "email",
      requiredErrorMessage: "Insira seu email",
    },
    password: {
      label: "Senha *",
      name: "password",
      requiredErrorMessage: "Insira sua senha",
    },
    confirmedPassword: {
      label: "Confirme sua senha *",
      name: "confirmedPassword",
      requiredErrorMessage: "Insira sua senha novamente"
    },
  };

  return SignUpFormModel;
}

export { getSignUpInitialValues } from "./initialValues";
export { getSignUpFormValidationSchema } from "./validationSchema";