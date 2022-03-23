import * as Yup from 'yup';
import validator from "validator";

import type { DateFilterFormModel } from './index';

export function getDateFilterFormValidationSchema(formModel: DateFilterFormModel) {
  const {date} = formModel;

  const validationSchema = Yup.object().shape({
    [date.name]: Yup.string()
    .required(date.requiredErrorMessage)
    .test("is-valid-date", `${date.requiredErrorMessage}`, (value) =>
      validator.isDate(value || "", { format: "DD/MM/YYYY", strictMode: true })
    ),
  });

  return validationSchema;
}