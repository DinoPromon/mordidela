import { getChangedValues } from "@utils/object/changedValues";
import { getObjectWithouUndefined } from "@utils/object/objectWithoutUndefined";

import type { IAddressesFormValues } from "../FormModel";

type AddressFormArg = {
  logradouro: string;
  bairro: string;
  numero: string;
  complemento: string | null;
};

export function getAddressFormArg(values: IAddressesFormValues) {
  const addressFormArg: AddressFormArg = {
    bairro: values.neighborhood,
    logradouro: values.publicPlace,
    numero: values.number,
    complemento: values.complement ? values.complement : null,
  };

  return addressFormArg;
}

export function getUpdateAddressFormArg(
  initialValues: IAddressesFormValues,
  values: IAddressesFormValues
) {
  const initialAddressArg = getAddressFormArg(initialValues);
  const addressArg = getAddressFormArg(values);

  const changedValues = getChangedValues(initialAddressArg, addressArg);

  return getObjectWithouUndefined(changedValues);
}
