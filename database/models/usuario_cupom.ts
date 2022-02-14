import type ICupom from "./cupom";
import type IUsuario from "./usuario";

interface IUsuarioCupom {
  id_usuario_cupom: number;
  data_obtencao: Date;
  data_uso: Date | number | string | null;
  foi_usado: boolean;
  id_cupom: ICupom["id_cupom"];
  id_usuario: IUsuario["id_usuario"];
}

export default IUsuarioCupom;
