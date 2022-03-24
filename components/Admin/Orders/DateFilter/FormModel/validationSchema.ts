import * as Yup from "yup";
import validator from "validator";

import type { DateFilterFormModel } from "./index";
import { FindDateFilter } from "../../constants";

export function getDateFilterFormValidationSchema(formModel: DateFilterFormModel) {
  const { date, dateFilter } = formModel;

  const validationSchema = Yup.object().shape({
    [date.name]: Yup.string()
      /* .required(date.requiredErrorMessage) */
      .test("is-valid-date", `${date.requiredErrorMessage}`, (value) =>
        validator.isDate(value || "", { format: "DD/MM/YYYY", strictMode: true })
      ),
    [dateFilter.name]: Yup.mixed().oneOf(Object.values(FindDateFilter)),
  });

  return validationSchema;
}
