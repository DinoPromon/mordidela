import Endereco from "@models/endereco";
import Usuario from "@models/usuario";

export type UserFormData = {
  nome: Usuario["nome"];
  data_nascimento: string;
  telefone: string;
  email: Usuario["email"];
  senha: Usuario["senha"];
  senha_confirmada: Usuario["senha"];
};

export type AddressFormData = {
  logradouro: Endereco["logradouro"];
  numero: Endereco["numero"];
  bairro: Endereco["bairro"];
  complemento: Endereco["complemento"];
};

export type GeneralDataForm = {
  nome: Usuario["nome"];
  data_nascimento: Usuario["id_usuario"];
  telefone: string;
};
