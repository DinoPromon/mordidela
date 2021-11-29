import Cupom from "./cupom";
import Usuario from "./usuario";

type UsuarioCupom = {
  id_cupom: Cupom["id_cupom"];
  id_usuario: Usuario["id_usuario"];
  data_uso: string | null;
  data_obtencao: string;
  foi_usado: boolean;
};

export default UsuarioCupom;
