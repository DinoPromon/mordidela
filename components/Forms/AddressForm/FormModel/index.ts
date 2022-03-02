import type { FormField } from "@my-types/form";

export interface IAddressFormValues {
  address: string;
  number: string;
  neighborhood: string;
  complement: string;
};

export type AddressFormModel = {
  [key in keyof IAddressFormValues]: FormField<IAddressFormValues>;
};

export function getAddressFormModel() {
  const AddressFormModel: AddressFormModel = {
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
      requiredErrorMessage: "Insira seu bairro"
    },
    complement: {
      label: "Complemento",
      name: "complement",
    },
  }

  return AddressFormModel;
}

export { getAddressInitialValues } from "./initialValues";
export { getAddressFormValidationSchema } from "./validationSchema";