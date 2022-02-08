import { clearPhoneNumber } from "@utils/transformation";
import { GeneralDataValues } from "../FormModel";

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
    data_nascimento: values.data_nascimento,
    ddd: fullPhoneNumber.substring(0, 2),
    numero: fullPhoneNumber.substring(2, values.telefone.length),
  };

  return generalDataArg;
}
