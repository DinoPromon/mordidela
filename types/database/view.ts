export type ViewUsuario = {
  id_usuario: number;
  nome: string;
  data_nascimento: string;
  email: string;
  data_criacao: string;
  autorizacao: "cliente" | "administrador";
  senha: string;
  telefone: string;
  id_endereco: string;
  endereco: string;
  complemento?: string;
  quantidade_pedido: number;
};
