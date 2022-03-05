import type IEndereco from "@models/endereco";
import type { IAddressesFormValues } from "./index";

export function getAddressesFormInitialValues(address?: IEndereco): IAddressesFormValues {
  if (address) {
    return {
      complement: address.complemento ? address.complemento : "",
      neighborhood: address.bairro,
      number: address.numero,
      publicPlace: address.logradouro,
    };
  }

  return {
    complement: "",
    neighborhood: "",
    number: "",
    publicPlace: "",
  };
}
