import type { IAddressesFormValues } from "./index";

export function getAddressesFormInitialValues(): IAddressesFormValues {
  return {
    complement: "",
    publicPlace: "",
    number: "",
    neighborhood: "",
  };
}
