import * as Yup from "yup";
import { transformPriceStringToNumber } from "@utils/transformation";

import type { AdditionalFormModel } from "./index";

export function getAdditionalFormValidationSchema(formModel: AdditionalFormModel) {
  const { name, price } = formModel;

  const validationSchema = Yup.object().shape({
    [name.name]: Yup.string().required(name.requiredErrorMessage),
    [price.name]: Yup.string()
      .required(price.requiredErrorMessage)
      .test("isMax", "Valor máximo de R$ 999,99", (price) => {
        if (!price) return false;

        return transformPriceStringToNumber(price) > 999.99 ? false : true;
      }),
  });

  return validationSchema;
}
