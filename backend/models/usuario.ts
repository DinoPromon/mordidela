import type ITelefone from "./telefone";

export enum Autorizacao {
  CLIENT = "cliente",
  ADMIN = "administrador",
}

interface IUsuario {
  id_usuario: number;
  nome: string;
  data_nascimento: Date | number;
  email: string;
  data_criacao: Date | number;
  autorizacao: Autorizacao;
  senha: string;
}

export interface UserGeneralData extends Omit<IUsuario, "senha" | "autorizacao"> {
  count_pedido: number;
  telefone: ITelefone;
}

export default IUsuario;
