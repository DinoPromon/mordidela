import IPedido from "@models/pedido";
import IUsuarioCupom from "@models/usuario_cupom";

export enum TipoCupom {
  ENTREGA = "entrega",
  PEDIDO = "pedido",
}

interface ICupom {
  id_cupom: number;
  descricao: string | null;
  data_criacao: Date | number | string;
  quantidade_uso: number | null;
  tipo: TipoCupom;
  codigo: string;
  valor_desconto: number;
  qtde_min_pedido: number;
  data_inicio: Date | number | string | null;
  data_fim: Date | null;
  fidelidade: boolean;
}

export interface RelatedUserCupomReq extends IUsuarioCupom {
  pedido: IPedido | null;
  cupom: ICupom;
}

export default ICupom;
