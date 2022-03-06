import type IUsuario from "./usuario";

interface ITelefone {
  id_telefone: number;
  ddd: string;
  numero: string;
  id_usuario: IUsuario["id_usuario"];
}

export default ITelefone;
