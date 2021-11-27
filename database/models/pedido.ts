import Cupom from "./cupom";
import Endereco from "./endereco";
import Usuario from "./usuario";

type Pedido = {
  id_pedido: string;
  data_pedido: string;
  data_confirmacao: string;
  status_pedido: "rejeitado" | "pendente" | "confirmado";
  preco_entrega: number;
  observacao: string;
  tipo_entrega: "entrega" | "balcao";
  tipo_pagamento: "dinheiro" | "credito" | "debito";
  troco_para: number;
  id_cupom: Cupom['id_cupom'];
  id_usuario: Usuario['id_usuario'];
  id_endereco: Endereco['id_endereco'];
};

export default Pedido;
