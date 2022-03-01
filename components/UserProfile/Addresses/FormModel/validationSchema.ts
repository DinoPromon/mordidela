import * as Yup from "yup";

import type { AddressesFormModel, IAddressesFormValues } from "./index";

export function getAddressesFormValidationSchema(formModel: AddressesFormModel) {
  const { publicPlace, neighborhood, number } = formModel;

  const validationSchema: Yup.SchemaOf<IAddressesFormValues> = Yup.object().shape({
    complement: Yup.string(),
    neighborhood: Yup.string().required(neighborhood.requiredErrorMessage),
    number: Yup.string().required(number.requiredErrorMessage),
    publicPlace: Yup.string().required(publicPlace.requiredErrorMessage),
  });

  return validationSchema;
}
