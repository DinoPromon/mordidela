import IUsuario from "@models/usuario";

export type LoginFormData = {
  email: IUsuario['email'];
  senha: IUsuario['senha'];
};
