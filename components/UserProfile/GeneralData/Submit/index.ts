import { clearPhoneNumber } from "@utils/transformation";
import { createDate } from "@utils/transformation/date";

import type { GeneralDataValues } from "../FormModel";

type GeneralDataArg = {
  nome: string;
  data_nascimento: string;
  ddd: string;
  numero: string;
};

export function getGeneralDataArg(values: GeneralDataValues) {
  const fullPhoneNumber = clearPhoneNumber(values.telefone);

  const generalDataArg: GeneralDataArg = {
    nome: values.nome,
    data_nascimento: createDate(values.data_nascimento).toISOString(),
    ddd: fullPhoneNumber.substring(0, 2),
    numero: fullPhoneNumber.substring(2, values.telefone.length),
  };

  return generalDataArg;
}
