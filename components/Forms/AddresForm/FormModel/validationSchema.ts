import * as Yup from "yup";

import type { AddresFormModel } from "./index";

export function getAddresFormValidationSchema(formModel: AddresFormModel) {
  const { addres, number, neighborhood, complement} = formModel;

  const validationSchema = Yup.object().shape({
    [addres.name]: Yup.string().required(addres.requiredErrorMessage),
    [number.name]: Yup.string().required(number.requiredErrorMessage),
    [neighborhood.name]: Yup.string().required(neighborhood.requiredErrorMessage),
    [complement.name]: Yup.string(),
  });

  return validationSchema;
}
