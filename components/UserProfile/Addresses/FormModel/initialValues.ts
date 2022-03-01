import type { IAddressesFormValues } from "./index";

export function getAddressesFormInitialValues(): IAddressesFormValues {
  return {
    complement: "",
    neighborhood: "",
    number: "",
    publicPlace: "",
  };
}
