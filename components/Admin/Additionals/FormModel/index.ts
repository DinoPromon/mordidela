import type { FormField } from "@my-types/form";

export interface IAdditionalFormValues {
  name: string;
  value: number | null;
}

export type AdditionalFormModel = {
  [key in keyof IAdditionalFormValues]: FormField<IAdditionalFormValues>;
};

export function getAdditionalFormModel() {
  const additionalFormModel: AdditionalFormModel = {
    name: {
      label: "Nome",
      name: "name",
      requiredErrorMessage: "Insira o nome do adicional",
    },
    value: {
      label: "Valor",
      name: "value",
      requiredErrorMessage: "Insira o valor do adicional"
    }
  };

  return additionalFormModel;
}

export { getAdditionalFormInitialValues } from "./initialValues";
export { getAdditionalFormValidationSchema } from "./validationSchema";
