import mysql from "database";
import { PedidoProdutoForClient, ViewPedidoProduto } from "@models/views";

export async function getAllProdutoInPedido(id_pedido: ViewPedidoProduto["id_pedido"]) {
  const query =
    "SELECT id_produto, quantidade, preco_pedido, observacao, nome, tamanho FROM vw_pedido_produto vpp WHERE vpp.id_pedido = ?";
  const result = (await mysql.query(query, [id_pedido])) as PedidoProdutoForClient[];
  await mysql.end();

  return result;
}
