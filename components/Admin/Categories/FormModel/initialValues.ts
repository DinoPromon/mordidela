import type ICategories from "@models/categoria";
import type { ICategoriesFormValues } from "./index";

export function getCategoriesFormInitialValues(category?: ICategories): ICategoriesFormValues {
  if (category) {
    return {
      name: category.nome,
    };
  }

  return {
    name: "",
  };
}
