type Usuario = {
  id_usuario?: string;
  nome?: string;
  data_nascimento?: string;
  email?: string;
  data_criacao?: string;
  autorizacao?: "cliente" | "administrador";
  senha?: string;
};

export default Usuario;
