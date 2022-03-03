import { IAddressFormValues } from "@components/Signup/FormModel";

type AddressFormArg = {
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string | null;
};

export function getAddressFormArg(values: IAddressFormValues): AddressFormArg {
  return {
    logradouro: values.address,
    bairro: values.neighborhood,
    complemento: values.complement ? values.complement : null,
    numero: values.number,
  };
}
