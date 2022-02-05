import { FormField } from "@my-types/form";
import * as Yup from "yup";
export { getGeneralDataInitialValues } from "./initialValues";

export interface GeneralDataValues {
  nome: string;
  data_nascimento: string;
  telefone: string;
}

type GeneralDataFormModel = {
  [key in keyof GeneralDataValues]: FormField<GeneralDataValues>;
};

export function getGeneralDataFormModel() {
  const generalDataFormModel: GeneralDataFormModel = {
    nome: {
      name: "nome",
      label: "Nome",
      requiredErrorMessage: "Insira seu nome",
    },
    data_nascimento: {
      name: "data_nascimento",
      label: "Data de nascimento",
      requiredErrorMessage: "Insira a data de nascimento",
    },
    telefone: {
      name: "telefone",
      label: "Telefone",
      requiredErrorMessage: "Insira o número do telefone",
    },
  };

  return generalDataFormModel;
}

export function getGeneralDataValidationSchema(formModel: GeneralDataFormModel) {
  const { data_nascimento, nome, telefone } = formModel;

  return Yup.object().shape({
    [nome.name]: Yup.string().required(nome.requiredErrorMessage),
    [data_nascimento.name]: Yup.string().required(data_nascimento.requiredErrorMessage),
    [telefone.name]: Yup.string().required(telefone.requiredErrorMessage),
  });
}