import { getDDDFromTelefone, getNumberFromTelefone } from "@utils/transformation";
import type { ISignUpFormValues } from "@components/Signup/FormModel";

type SignUpFormArg = {
  nome: string;
  data_nascimento: string;
  ddd: string;
  numero_telefone: string;
  email: string;
  senha: string;
};

export function getSignupFormArg(values: ISignUpFormValues): SignUpFormArg {
  return {
    nome: values.name,
    data_nascimento: values.birthDate,
    ddd: getDDDFromTelefone(values.phoneNumber),
    numero_telefone: getNumberFromTelefone(values.phoneNumber),
    email: values.email,
    senha: values.password,
  };
}
