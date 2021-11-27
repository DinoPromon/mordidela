import Usuario from "./usuario";

type Telefone = {
  id_telefone: string;
  ddd: string;
  numero: string;
  id_usuario: Usuario['id_usuario'];
};

export default Telefone;
