import type IUsuario from "@models/usuario";
import type IEndereco from "@models/endereco";

export type UserFormData = {
  nome: IUsuario["nome"];
  data_nascimento: string;
  telefone: string;
  email: IUsuario["email"];
  senha: IUsuario["senha"];
  senha_confirmada: IUsuario["senha"];
};

export type AddressFormData = {
  logradouro: IEndereco["logradouro"];
  numero: IEndereco["numero"];
  bairro: IEndereco["bairro"];
  complemento: IEndereco["complemento"];
};

export type GeneralDataForm = {
  nome: IUsuario["nome"];
  data_nascimento: IUsuario["id_usuario"];
  telefone: string;
};
