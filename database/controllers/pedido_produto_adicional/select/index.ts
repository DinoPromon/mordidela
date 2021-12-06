import mysql from "database";

import Adicional from "@models/adicional";
import { ViewPedidoProdutoAdicional } from "@models/views";

export async function getAllddsInPedidoProduto(
  id_pedido: ViewPedidoProdutoAdicional["id_pedido"],
  id_adicional: ViewPedidoProdutoAdicional["id_adicional"]
) {
  const query =
    "SELECT id_adicional, nome, preco FROM vw_pedido_produto_adicional vppa WHERE vppa.id_pedido = ? AND vppa.id_produto = ? ";
  const result = (await mysql.query(query, [id_pedido, id_adicional])) as Adicional[];
  await mysql.end();

  return result;
}
