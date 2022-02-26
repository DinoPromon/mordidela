import * as Yup from "yup";

import type { AddressesFormModel } from "./index";

export function getAddressesFormValidationSchema(formModel: AddressesFormModel) {
  const { publicPlace, neighborhood, number, complement } = formModel;

  const validationSchema = Yup.object().shape({
    [publicPlace.name]: Yup.string().required(publicPlace.requiredErrorMessage),
    [neighborhood.name]: Yup.string().required(neighborhood.requiredErrorMessage),
    [number.name]: Yup.string().required(number.requiredErrorMessage),
    [complement.name]: Yup.string().notRequired(),
  });

  return validationSchema;
}
