import type { FormField } from "@my-types/form";
import { getCategoriesFormValidationSchema } from "./validationSchema";

export interface ICategoriesFormValues {
  name: string;
}

export type CategoriesFormModel = {
  [key in keyof ICategoriesFormValues]: FormField<ICategoriesFormValues>;
};

export function getCategoriesFormModel() {
  const categoriesFormModel: CategoriesFormModel = {
    name: {
      label: "Nome",
      name: "name",
      requiredErrorMessage: "Insira o nome da categoria",
    },
  };

  return categoriesFormModel;
}

export { getCategoriesFormInitialValues } from "./initialValues";
export { getCategoriesFormValidationSchema } from "./validationSchema";
