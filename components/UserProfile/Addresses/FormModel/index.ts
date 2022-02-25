import * as Yup from "yup";
import type { FormField } from "@my-types/form";

export interface IAddressesFormValues {
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
}

export type AddressesFormModel = {
  [key in keyof IAddressesFormValues]: FormField<IAddressesFormValues>;
};

export function getAddressesFormModel() {
  const addressesFormModel: AddressesFormModel = {
    logradouro: {
      label: "Logradouro*",
      name: "logradouro",
      requiredErrorMessage: "Insira o logradouro",
    },
    bairro: {
      label: "Bairro*",
      name: "bairro",
      requiredErrorMessage: "Insira o bairro",
    },
    numero: {
      label: "Número*",
      name: "numero",
      requiredErrorMessage: "Insira o número",
    },
    complemento: {
      label: "Complemento",
      name: "complemento",
    },
  };

  return addressesFormModel;
}

export { getAddressesFormInitialValues } from "./initialValues";
export { getAddressesFormValidationSchema } from "./validationSchema";
