import { AddressFormValidations, LoginFormValidations, UserFormValidations } from "@my-types/validation";

export const getSignupErrorMessage = (key?: keyof UserFormValidations): string => {
  switch (key) {
    case "nome":
      return "Por favor, insira um nome válido.";
    case "data_nascimento":
      return "Por favor, insira uma data de nascimento válida.";
    case "email":
      return "Por favor, insira um email válido.";
    case "senha":
      return "Senha necessita ter ao menos 5 caracteres e 3 números.";
    case "telefone":
      return "Por favor, insira um telefone válido.";
    case "senha_confirmada":
      return "As senhas precisam ser iguais!";
  }
  return "";
};

export const getAddressErrorMessage = (key?: keyof AddressFormValidations): string => {
  switch (key) {
    case "logradouro":
      return "Por favor, insira um logradouro existente.";
    case "numero":
      return "Por favor, insira um número valido.";
    case "bairro":
      return "Por favor, insira um bairro válido.";
  }
  return "";
};

export const getLoginErrorMessage = (key?: keyof LoginFormValidations): string => {
  switch (key) {
    case "email":
      return "Email aparenta ser inválido. Certeza que escreveu corretamente?";
    case "senha":
      return "Verifique sua senha. A mesma não segue o mínimo exigido de 5 caracteres e 3 números.";
  }
  return "";
};
