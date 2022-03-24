import { FindDateFilter } from "../../constants";
import type { IDateFilterFormValues } from "./index";

export function getDateFilterFormInitialValues(): IDateFilterFormValues {
  return {
    date: "",
    dateFilter: FindDateFilter.NONE,
  };
}
