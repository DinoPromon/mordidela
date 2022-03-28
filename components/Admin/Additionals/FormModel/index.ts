import type { FormField } from "@my-types/form";

export interface IAdditionalFormValues {
  name: string;
  price: string;
}

export type AdditionalFormModel = {
  [key in keyof IAdditionalFormValues]: FormField<IAdditionalFormValues>;
};

export type SetAdditionalFormValue = <T extends keyof IAdditionalFormValues>(
  key: T,
  value: IAdditionalFormValues[T]
) => void;

export function getAdditionalFormModel() {
  const additionalFormModel: AdditionalFormModel = {
    name: {
      label: "Nome",
      name: "name",
      requiredErrorMessage: "Insira o nome do adicional",
    },
    price: {
      label: "Valor",
      name: "price",
      requiredErrorMessage: "Insira o valor do adicional",
    },
  };

  return additionalFormModel;
}

export { getAdditionalFormInitialValues } from "./initialValues";
export { getAdditionalFormValidationSchema } from "./validationSchema";
