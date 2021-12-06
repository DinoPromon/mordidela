import Usuario from "@models/usuario";
import mysql, { serialize } from "database";
import { ViewPedidoForClient } from "@models/views";

export async function getAllPedidosFromUsuario(id_usuario: Usuario["id_usuario"]) {
  const query = `
    SELECT endereco, data_pedido, data_confirmacao, status_pedido, tipo_entrega, tipo_pagamento, troco_para, valor_total, troco
    FROM vw_pedido
    WHERE id_usuario = ?
  `;
  const result = (await mysql.query(query, [id_usuario])) as ViewPedidoForClient[];
  await mysql.end();
  return serialize(result);
}
