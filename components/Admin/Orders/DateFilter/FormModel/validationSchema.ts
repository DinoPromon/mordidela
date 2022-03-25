import * as Yup from "yup";
import validator from "validator";

import type { DateFilterFormModel } from "./index";
import { FindDateFilter } from "../../utility/constants";

export function getDateFilterFormValidationSchema(formModel: DateFilterFormModel) {
  const { date, dateFilter } = formModel;

  const validationSchema = Yup.object().shape({
    [dateFilter.name]: Yup.mixed().oneOf(Object.values(FindDateFilter)),
    [date.name]: Yup.string().when(dateFilter.name, {
      is: (filterValue: FindDateFilter) => filterValue === FindDateFilter.DATE,
      then: Yup.string()
        .required(date.requiredErrorMessage)
        .test("is-valid-date", `${date.requiredErrorMessage}`, (value) =>
          validator.isDate(value || "", { format: "DD/MM/YYYY", strictMode: true })
        ),
      otherwise: Yup.string(),
    }),
  });

  return validationSchema;
}
