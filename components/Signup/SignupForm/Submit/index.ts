import type { ISignUpFormValues } from "@components/Signup/FormModel";

type SignUpFormArg = {
  nome: string;
  data_nascimento: string;
  telefone: string;
  email: string;
  senha: string;
  senha_confirmada: string;
};

export function getSignupFormArg(values: ISignUpFormValues): SignUpFormArg {
  return {
    nome: values.name,
    data_nascimento: values.birthDate,
    telefone: values.phoneNumber,
    email: values.email,
    senha: values.password,
    senha_confirmada: values.confirmedPassword,
  };
}
