import type { FormField } from "@my-types/form";

export interface IAddressesFormValues {
  publicPlace: string;
  number: string;
  neighborhood: string;
  complement: string;
}

export type AddressesFormModel = {
  [key in keyof IAddressesFormValues]: FormField<IAddressesFormValues>;
};

export function getAddressesFormModel() {
  const addressesFormModel: AddressesFormModel = {
    publicPlace: {
      label: "Logradouro*",
      name: "publicPlace",
      requiredErrorMessage: "Insira o logradouro",
    },
    neighborhood: {
      label: "Bairro*",
      name: "neighborhood",
      requiredErrorMessage: "Insira o bairro",
    },
    number: {
      label: "Número*",
      name: "number",
      requiredErrorMessage: "Insira o número",
    },
    complement: {
      label: "Complemento",
      name: "complement",
    },
  };

  return addressesFormModel;
}

export { getAddressesFormInitialValues } from "./initialValues";
export { getAddressesFormValidationSchema } from "./validationSchema";
