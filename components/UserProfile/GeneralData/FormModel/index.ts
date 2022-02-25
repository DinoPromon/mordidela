import * as Yup from "yup";
import { validateDate } from "./utility";
import { phoneValidation } from "@utils/validations";

import type { FormField } from "@my-types/form";

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
      requiredErrorMessage: "Insira uma data válida",
    },
    telefone: {
      name: "telefone",
      label: "Telefone",
      requiredErrorMessage: "Insira o seu número do telefone",
    },
  };

  return generalDataFormModel;
}

export function getGeneralDataValidationSchema(formModel: GeneralDataFormModel) {
  const { data_nascimento, nome, telefone } = formModel;

  const validationSchema = Yup.object().shape({
    [nome.name]: Yup.string().required(nome.requiredErrorMessage),
    [data_nascimento.name]: Yup.string()
      .test("is-valid-date", `${data_nascimento.requiredErrorMessage}`, (value) =>
        validateDate(value as string)
      )
      .required(data_nascimento.requiredErrorMessage),
    [telefone.name]: Yup.string()
      .required(telefone.requiredErrorMessage)
      .test("is-phone-valid", "Número de telefone inválido", (value) =>
        phoneValidation(value || "")
      ),
  });

  return validationSchema;
}

export { getGeneralDataInitialValues } from "./initialValues";
