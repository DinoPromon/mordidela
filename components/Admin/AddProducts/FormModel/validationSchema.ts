import * as Yup from "yup";
import { ProductAvailable } from "../utility/constants";

import type { ProductsFormModel } from "./index";

export function getProductsFormValidationSchema(formModel: ProductsFormModel) {
  const { name, defaultPrice, size, available, description, image, maxFlavors } = formModel;

  const validationSchema = Yup.object().shape({
    [name.name]: Yup.string().required(name.requiredErrorMessage),
    [defaultPrice.name]: Yup.string().required(defaultPrice.requiredErrorMessage),
    [size.name]: Yup.string(),
    [maxFlavors.name]: Yup.string()
      .required(maxFlavors.requiredErrorMessage)
      .test("isInteger", maxFlavors.requiredErrorMessage!, (maxFlavors) => {
        if (!maxFlavors) return false;

        const numberMaxFlavor = parseInt(maxFlavors, 10);

        return isNaN(numberMaxFlavor) ? false : true;
      }),
    [available.name]: Yup.mixed()
      .oneOf(Object.values(ProductAvailable))
      .required(available.requiredErrorMessage),
    [description.name]: Yup.string(),
    [image.name]: Yup.mixed().notRequired(),
  });

  return validationSchema;
}
