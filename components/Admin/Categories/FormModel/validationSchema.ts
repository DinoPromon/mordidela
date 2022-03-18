import * as Yup from 'yup';

import type { CategoriesFormModel } from './index';

export function getCategoriesFormValidationSchema(formModel: CategoriesFormModel) {
  const {name} = formModel;

  const validationSchema = Yup.object().shape({
    [name.name]: Yup.string().required(name.requiredErrorMessage)
  });

  return validationSchema;
}