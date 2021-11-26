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
  id_cupom: Pick<Cupom, "id_cupom">;
  id_usario: Pick<Usuario, "id_usuario">;
  id_endereco: Pick<Endereco, "id_endereco">;
};

export default Pedido;
