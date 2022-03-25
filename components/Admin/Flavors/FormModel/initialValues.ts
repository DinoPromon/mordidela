import type ISabor from "@models/sabor";
import type { IFlavorsFormValues } from "./index";

export function getFlavorsFormInitialValues(flavor?: ISabor): IFlavorsFormValues {
  if (flavor) {
    return {
      name: flavor.nome,
    };
  }

  return {
    name: "",
  };
}
