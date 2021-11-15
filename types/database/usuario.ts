export type Usuario = {
  id_usuario: number;
  nome: string;
  data_nascimento: string;
  email: string;
  data_criacao: string;
  autorizacao: "cliente" | "administrador";
  senha: string;
};
