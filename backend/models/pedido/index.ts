import { StatusPedido, TipoEntrega, TipoPagamento } from "./constants";

import type ICupom from "../cupom";
import type IUsuario from "../usuario";
import type IEndereco from "../endereco";

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

export default IPedido;

export { StatusPedido, TipoEntrega, TipoPagamento };

export type { IOrderRelations } from "./orderRelations";
export type { IOrderGeneralData } from "./orderGeneralData";
