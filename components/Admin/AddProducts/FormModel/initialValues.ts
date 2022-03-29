import { ProductAvailable } from "../utility/constants";

import type { IProductsFormValues } from "./index";

export function getProductsFormInitialValues(): IProductsFormValues {
  return {
    name: "",
    defaultPrice: "",
    size: "",
    available: ProductAvailable.TRUE,
    description: "",
    image: undefined,
    maxFlavors: "",
  };
}
