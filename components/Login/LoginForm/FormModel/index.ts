import type { FormField } from "@my-types/form";

export interface ILoginFormValues {
  email: string;
  password: string;
}

export type LoginFormModel = {
  [key in keyof ILoginFormValues]: FormField<ILoginFormValues>;
};

export function getLoginFormModel() {
  const loginFormModel: LoginFormModel = {
    email: {
      label: "Email",
      name: "email",
      requiredErrorMessage: "Insira seu email",
    },
    password: {
      label: "Senha",
      name: "password",
      requiredErrorMessage: "Insira sua senha",
    },
  };

  return loginFormModel;
}

export { getLoginFormInitialValues } from "./initialValues";
export { getLoginFormValidationSchema } from "./validationSchema";
