import Cupom from "./cupom";
import Endereco from "./endereco";
import Usuario from "./usuario";

type Pedido = {
  id_pedido: number;
  data_pedido: Date;
  data_confirmacao?: Date | null;
  status_pedido: "rejeitado" | "pendente" | "confirmado";
  preco_entrega: number;
  tipo_entrega: "entrega" | "balcao";
  tipo_pagamento: "dinheiro" | "credito" | "debito";
  troco_para?: number | null;
  id_cupom?: Cupom["id_cupom"] | null;
  id_usuario: Usuario["id_usuario"];
  id_endereco?: Endereco["id_endereco"] | null;
};

export type CartPedido = Pick<
  Pedido,
  "troco_para" | "id_cupom" | "tipo_pagamento" | "tipo_entrega" | "id_usuario" | "id_endereco"
>;

export default Pedido;
