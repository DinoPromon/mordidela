import mysql from "database";
import PedidoProduto from "@models/pedido_produto";

export async function insertPedidoProduto(data: Omit<PedidoProduto, "preco_pedido">) {
  const { id_pedido, id_produto, observacao, quantidade } = data;
  const query = "INSERT INTO pedido_produto(id_pedido,id_produto,quantidade, observacao) VALUES (?, ?, ?, ?)";
  const result = await mysql.query(query, [id_pedido, id_produto, quantidade, observacao]);
  await mysql.end();
}
