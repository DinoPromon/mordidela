import mysql from "database";
import { ViewPedidoProdutoSabor } from "@models/views";
import Sabor from "@models/sabor";

export async function getAllSaborInPedidoProduto(
  id_pedido: ViewPedidoProdutoSabor["id_pedido"],
  id_produto: ViewPedidoProdutoSabor["id_sabor"]
) {
  const query =
    "SELECT id_sabor, nome FROM vw_pedido_produto_sabor vpps WHERE vpps.id_pedido = ? AND vpps.id_produto = ?";
  const result = (await mysql.query(query, [id_pedido, id_produto])) as Sabor[];
  await mysql.end();

  return result;
}
