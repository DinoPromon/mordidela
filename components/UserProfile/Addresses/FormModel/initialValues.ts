import type { IAddressesFormValues } from "./index";

export function getAddressesFormInitialValues(): IAddressesFormValues {
  return {
    complemento: "",
    logradouro: "",
    numero: "",
    bairro: "",
  };
}
