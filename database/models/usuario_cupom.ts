import ICupom from "./cupom";
import IPedido from "./pedido";

interface IUsuarioCupom {
  id_usuario_cupom: number;
  data_obtencao: Date;
  data_uso: Date | number | string | null;
  id_cupom: ICupom["id_cupom"];
  id_pedido: IPedido["id_pedido"] | null;
}

export default IUsuarioCupom;
