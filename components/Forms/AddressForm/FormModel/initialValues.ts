import type { IAddressFormValues } from "./index";

export function getAddressInitialValues(): IAddressFormValues {
  return {
    address: "",
    number: "",
    neighborhood: "",
    complement: "",
  };
}