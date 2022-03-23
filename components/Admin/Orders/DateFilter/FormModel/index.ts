import type { FormField } from "@my-types/form";

export interface IDateFilterFormValues {
  date: string;
}

export type DateFilterFormModel = {
  [key in keyof IDateFilterFormValues]: FormField<IDateFilterFormValues>;
};

export function getDateFilterFormModel() {
  const dateFilterFormModel: DateFilterFormModel = {
    date: {
      label: "Data",
      name: "date",
      requiredErrorMessage: "Insira uma data",
    },
  };

  return dateFilterFormModel;
}

export { getDateFilterFormInitialValues } from "./initialValues";
export { getDateFilterFormValidationSchema } from "./validationSchema";
