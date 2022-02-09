import Pedido from "@models/pedido";
import UsuarioCupom from "@models/usuario_cupom";

type Cupom = {
  id_cupom: number;
  descricao?: string | null;
  data_criacao: Date;
  quantidade_uso?: number | null;
  tipo: "entrega" | "pedido";
  codigo: string;
  valor_desconto: number;
  qtde_min_pedido: number;
  data_inicio: Date | null;
  data_fim?: Date | null;
  fidelidade: boolean;
};

export interface RelatedUserCupomReq extends UsuarioCupom {
  pedido: Pedido | null;
  cupom: Cupom;
}

export default Cupom;
