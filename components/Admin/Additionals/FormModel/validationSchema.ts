import * as Yup from "yup";

import type { AdditionalFormModel } from "./index";

export function getAdditionalFormValidationSchema(formModel: AdditionalFormModel) {
  const { name, value } = formModel;

  const validationSchema = Yup.object().shape({
    [name.name]: Yup.string().required(name.requiredErrorMessage),
    [value.name]: Yup.number().required(value.requiredErrorMessage),
  });

  return validationSchema;
}
