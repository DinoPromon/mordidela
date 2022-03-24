import { INIT_ORDER_FILTER } from "../../constants";

import type { IDateFilterFormValues } from "./index";

export function getDateFilterFormInitialValues(): IDateFilterFormValues {
  return {
    date: "",
    dateFilter: INIT_ORDER_FILTER.dateFilter,
  };
}
