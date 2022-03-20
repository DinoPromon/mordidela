import type { FormField } from "@my-types/form";

export interface IFlavorsFormValues {
  name: string;
}

export type FlavorsFormModel = {
  [key in keyof IFlavorsFormValues]: FormField<IFlavorsFormValues>;
};

export function getFlavorsFormModel() {
  const flavorsFormModel: FlavorsFormModel = {
    name: {
      label: "Nome",
      name: "name",
      requiredErrorMessage: "Insira o nome do sabor",
    },
  };

  return flavorsFormModel;
}

export { getFlavorsFormInitialValues } from "./initialValues";
export { getFlavorsFormValidationSchema } from "./validationSchema";
