type Usuario = {
  id_usuario: number;
  nome: string;
  data_nascimento: Date;
  email: string;
  data_criacao: Date;
  autorizacao: "cliente" | "administrador";
  senha: string;
};

export default Usuario;
