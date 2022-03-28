import { getNumberAsCurrency } from "@utils/transformation";

import type IAdicional from "@models/adicional";
import type { IAdditionalFormValues } from "./index";

export function getAdditionalFormInitialValues(add?: IAdicional): IAdditionalFormValues {
  if (!add) {
    return {
      name: "",
      price: "",
    };
  }

  return {
    name: add.nome,
    price: getNumberAsCurrency(add.preco),
  };
}
