import * as Yup from "yup";

import type { AddressesFormModel } from "./index";

export function getAddressesFormValidationSchema(formModel: AddressesFormModel) {
  const { logradouro, bairro, numero, complemento } = formModel;

  const validationSchema = Yup.object().shape({
    [logradouro.name]: Yup.string().required(logradouro.requiredErrorMessage),
    [bairro.name]: Yup.string().required(bairro.requiredErrorMessage),
    [numero.name]: Yup.string().required(numero.requiredErrorMessage),
    [complemento.name]: Yup.string().notRequired(),
  });

  return validationSchema;
}
