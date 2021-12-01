import Usuario from "@models/usuario";

export type LoginFormData = {
  email: Usuario['data_nascimento'];
  senha: Usuario['senha'];
};
