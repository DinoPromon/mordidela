import Usuario from "@models/usuario";

export type LoginFormData = {
  email: Usuario['email'];
  senha: Usuario['senha'];
};
