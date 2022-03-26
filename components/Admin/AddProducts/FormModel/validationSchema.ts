import * as Yup from 'yup';

import type { ProductsFormModel } from './index';

export function getProductsFormValidationSchema(formModel: ProductsFormModel) {
  const {name, defaultPrice, size, available, description, image} = formModel;

  const validationSchema = Yup.object().shape({
    [name.name]: Yup.string().required(name.requiredErrorMessage),
    [defaultPrice.name]: Yup.number().required(defaultPrice.requiredErrorMessage),
    [size.name]: Yup.string(),
    [available.name]: Yup.string().required(available.requiredErrorMessage),
    [description.name]: Yup.string(),
    [image.name]: Yup.string(),
  });

  return validationSchema;
}