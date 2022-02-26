import type { IAddressesFormValues } from "../FormModel";

type AddressFormArg = {
  logradouro: string;
  bairro: string;
  numero: string;
  complemento?: string;
};

export function getAddressFormArg(values: IAddressesFormValues) {
  const addressFormArg: AddressFormArg = {
    bairro: values.neighborhood,
    logradouro: values.publicPlace,
    numero: values.number,
    complemento: values.complement,
  };

  return addressFormArg;
}
