import Cupom from "./cupom";
import Pedido from "./pedido";

type UsuarioCupom = {
  id_usuario_cupom: number;
  data_obtencao: Date;
  data_uso?: Date | null;
  id_cupom: Cupom["id_cupom"];
  id_pedido?: Pedido["id_pedido"] | null;
};

export default UsuarioCupom;
