import type { FormField } from "@my-types/form";
import { FindDateFilter } from "../../constants";

export interface IDateFilterFormValues {
  date: string;
  dateFilter: FindDateFilter;
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
    dateFilter: {
      label: "Filtro",
      name: "dateFilter",
    },
  };

  return dateFilterFormModel;
}

export { getDateFilterFormInitialValues } from "./initialValues";
export { getDateFilterFormValidationSchema } from "./validationSchema";
