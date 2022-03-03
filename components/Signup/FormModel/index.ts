import type { FormField } from "@my-types/form";

export interface IAddressFormValues {
  address: string;
  number: string;
  neighborhood: string;
  complement: string;
}

export interface ISignUpFormValues {
  name: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

export type SignupCompleteFormValues = IAddressFormValues &
  ISignUpFormValues & {
    isAddressForm: boolean;
  };

export type AddressFormModel = {
  [key in keyof IAddressFormValues]: FormField<IAddressFormValues>;
};

export type SignUpFormModel = {
  [key in keyof ISignUpFormValues]: FormField<ISignUpFormValues>;
};

export type SignupCompleteFormModel = {
  [key in keyof SignupCompleteFormValues]: FormField<SignupCompleteFormValues>;
};

export function getSignupCompleteFormModel() {
  const SignUpFormModel: SignupCompleteFormModel = {
    isAddressForm: {
      label: "",
      name: "isAddressForm",
    },
    name: {
      label: "Nome*",
      name: "name",
      requiredErrorMessage: "Insira seu nome",
    },
    birthDate: {
      label: "Data de nascimento*",
      name: "birthDate",
      requiredErrorMessage: "Insira sua data de nascimento",
    },
    phoneNumber: {
      label: "Telefone*",
      name: "phoneNumber",
      requiredErrorMessage: "Insira seu número de telefone",
    },
    email: {
      label: "Email*",
      name: "email",
      requiredErrorMessage: "Insira seu email",
    },
    password: {
      label: "Senha*",
      name: "password",
      requiredErrorMessage: "Insira sua senha",
    },
    confirmedPassword: {
      label: "Confirme sua senha*",
      name: "confirmedPassword",
      requiredErrorMessage: "Insira sua senha novamente",
    },
    address: {
      label: "Logradouro * ",
      name: "address",
      requiredErrorMessage: "Insira seu logradouro",
    },
    number: {
      label: "Número *",
      name: "number",
      requiredErrorMessage: "Insira seu número",
    },
    neighborhood: {
      label: "Bairro *",
      name: "neighborhood",
      requiredErrorMessage: "Insira seu bairro",
    },
    complement: {
      label: "Complemento",
      name: "complement",
    },
  };

  return SignUpFormModel;
}

export { getSignupCompleteInitialValues } from "./initialValues";
export { getSignupCompleteValidationSchema } from "./validationSchema";
