import { UserFormValidations } from "@my-types/validation"
import { nameValidation, emailValidation, passwordValidation } from "@utils/validations"

export const userFormValidation: UserFormValidations = {
  nome: nameValidation,
  data_nascimento: nameValidation,
  email: emailValidation,
  senha: passwordValidation,
  senha_confirmada: passwordValidation,
  telefone: nameValidation
}

export const getErrorMessage = (key: keyof UserFormValidations) => {
  console.log(key);
  switch(key) {
    case('nome'):
      return ("Por favor, insira um nome válido.");
    case('data_nascimento'):
      return ("Por favor, insira uma data de nascimento válida.");
    case('email'):
      return ("Por favor, insira um email válido.");
    case('senha'):
      return ("Senha necessita ter ao menos 5 caracteres e 3 números.");
    case('telefone'):
      return ("Por favor, insira um telefone válido.");
  }
  return "";
};
