import { GeneralDataValues } from "./index";
import { UserGeneralData } from "@models/usuario";
import { formatPhoneNumber } from "@utils/formatters";
import { getFormatedDate } from "@utils/transformation";

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
