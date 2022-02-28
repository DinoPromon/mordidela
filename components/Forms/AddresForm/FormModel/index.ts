import type { FormField } from "@my-types/form";

export interface IAddresFormValues {
  addres: string;
  number: string;
  neighborhood: string;
  complement: string;
};

export type AddresFormModel = {
  [key in keyof IAddresFormValues]: FormField<IAddresFormValues>;
};

export function getAddresFormModel() {
  const AddresFormModel: AddresFormModel = {
    addres: {
      label: "Logradouro * ",
      name: "addres",
      requiredErrorMessage: "Insira seu logradouro",
    },
    number: {
      label: "Número",
      name: "number",
      requiredErrorMessage: "Insira seu número",
    },
    neighborhood: {
      label: "Bairro",
      name: "neighborhood",
      requiredErrorMessage: "Insira seu bairro"
    },
    complement: {
      label: "Complemento",
      name: "complement",
    },
  }

  return AddresFormModel;
}

export { getAddresInitialValues } from "./initialValues";
export { getAddresFormValidationSchema } from "./validationSchema";