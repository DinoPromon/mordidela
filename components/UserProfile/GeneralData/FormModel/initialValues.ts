import { formatPhoneNumber } from "@utils/formatters";
import { getFormatedDate } from "@utils/transformation";

import type { GeneralDataValues } from "./index";
import type { UserGeneralData } from "@models/usuario";

function getFormatedPhoneNumber(values: UserGeneralData) {
  const stringPhoneNumber = `${values.telefone.ddd}${values.telefone.numero}`;
  return formatPhoneNumber(stringPhoneNumber);
}

export function getGeneralDataInitialValues(initialValues: UserGeneralData) {
  const generalDataInitialValues: GeneralDataValues = {
    nome: initialValues.nome,
    telefone: getFormatedPhoneNumber(initialValues),
    data_nascimento: getFormatedDate(initialValues.data_nascimento as number),
  };

  return generalDataInitialValues;
}
