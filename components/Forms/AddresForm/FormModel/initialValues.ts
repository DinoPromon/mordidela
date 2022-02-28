import type { IAddresFormValues } from "./index";

export function getAddresInitialValues(): IAddresFormValues {
  return {
    addres: "",
    number: "",
    neighborhood: "",
    complement: "",
  };
}