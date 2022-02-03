import Usuario from "./usuario";

interface Telefone {
  id_telefone: number;
  ddd: string;
  numero: string;
  id_usuario: Usuario["id_usuario"];
}

export default Telefone;
