import * as Yup from "yup";

import type { AddressFormModel } from "./index";

export function getAddressFormValidationSchema(formModel: AddressFormModel) {
  const { address, number, neighborhood, complement} = formModel;

  const validationSchema = Yup.object().shape({
    [address.name]: Yup.string().required(address.requiredErrorMessage),
    [number.name]: Yup.string().required(number.requiredErrorMessage),
    [neighborhood.name]: Yup.string().required(neighborhood.requiredErrorMessage),
    [complement.name]: Yup.string(),
  });

  return validationSchema;
}
