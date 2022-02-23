import type ICupom from "./cupom";
import type IUsuario from "./usuario";
import type IEndereco from "./endereco";
import type IUsuarioCupom from "./usuario_cupom";
import type { IOrderProductRelations } from "./pedido_produto";
import type { IOrderProductAddRelations } from "./pedido_produto_adicional";
import type { IOrderProductFlavorRelations } from "./pedido_produto_sabor";

export enum StatusPedido {
  REJEITADO = "rejeitado",
  PENDENTE = "pendente",
  CONFIRMADO = "confirmado",
}

export enum TipoEntrega {
  ENTREGA = "entrega",
  BALCAO = "balcao",
}

export enum TipoPagamento {
  DINHEIRO = "dinheiro",
  CREDITO = "credito",
  DEBITO = "debito",
}

interface IPedido {
  id_pedido: number;
  data_pedido: Date | string | number;
  data_confirmacao: Date | string | number | null;
  status_pedido: StatusPedido;
  preco_entrega: number;
  tipo_entrega: TipoEntrega;
  tipo_pagamento: TipoPagamento;
  troco_para: number | null;
  id_cupom: ICupom["id_cupom"] | null;
  id_usuario: IUsuario["id_usuario"];
  id_endereco: IEndereco["id_endereco"] | null;
}

export type CartPedido = Pick<
  IPedido,
  "troco_para" | "id_cupom" | "tipo_pagamento" | "tipo_entrega" | "id_usuario" | "id_endereco"
>;

export interface IOrderRelations extends IPedido {
  cupom: ICupom | null;
  endereco: IEndereco | null;
  pedido_produto: IOrderProductRelations[];
  pedido_produto_adicional: IOrderProductAddRelations[];
  pedido_produto_sabor: IOrderProductFlavorRelations[];
  usuario_cupom: IUsuarioCupom[];
}

export default IPedido;
