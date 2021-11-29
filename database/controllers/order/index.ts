import mysql, { serialize } from "database";
import Pedido from "@models/pedido";

type PedidoData = Pick<Pedido, "id_usuario" | "tipo_pagamento" | "tipo_entrega" | "id_cupom" | "troco_para">;

export async function insertPedido(pedido: PedidoData) {
  const { id_cupom, id_usuario, tipo_entrega, tipo_pagamento, troco_para } = pedido;
  const query =
    "SELECT f_insert_pedido(?, ?, (SELECT id_endereco FROM endereco WHERE id_usuario = ?), ?, ?, ?)";

  const result = (await mysql.query(query, [
    id_cupom || null,
    id_usuario,
    id_usuario,
    tipo_entrega,
    tipo_pagamento,
    troco_para || 0,
  ])) as Pick<Pedido, "id_pedido">[];

  const serializedResult = serialize(result);
  return Object.values(serializedResult[0])[0];
}
