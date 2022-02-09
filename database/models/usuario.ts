import ITelefone from "./telefone";

enum UserAuthorization {
  CLIENT = "cliente",
  ADMIN = "administrador",
}

interface IUsuario {
  id_usuario: number;
  nome: string;
  data_nascimento: Date | number;
  email: string;
  data_criacao: Date | number;
  autorizacao: UserAuthorization;
  senha: string;
}

export interface UserWithoutPassword extends Omit<IUsuario, "senha"> {}

export interface UserGeneralData extends UserWithoutPassword {
  count_pedido: number;
  telefone: ITelefone;
}

export default IUsuario;
