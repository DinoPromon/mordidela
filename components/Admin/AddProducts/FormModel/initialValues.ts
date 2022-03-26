import type { IProductsFormValues } from "./index";

export function getProductsFormInitialValues(): IProductsFormValues {
  return {
    name: "",
    defaultPrice: null,
    size: "",
    available: "",
    description: "",
    image: "",
  };
}
