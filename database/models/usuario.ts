import Telefone from "./telefone";

enum UserAuthorization {
  CLIENT = "cliente",
  ADMIN = "administrador",
}

interface Usuario {
  id_usuario: number;
  nome: string;
  data_nascimento: Date | number;
  email: string;
  data_criacao: Date | number;
  autorizacao: UserAuthorization;
  senha: string;
}

export interface UserWithoutPassword extends Omit<Usuario, "senha"> {}

export interface UserGeneralData extends UserWithoutPassword {
  count_pedido: number;
  telefone: Telefone;
}

export default Usuario;
