import * as Yup from 'yup';

import type { FlavorsFormModel } from './index';

export function getFlavorsFormValidationSchema(formModel: FlavorsFormModel) {
  const {name} = formModel;

  const validationSchema = Yup.object().shape({
    [name.name]: Yup.string().required(name.requiredErrorMessage)
  });

  return validationSchema;
}