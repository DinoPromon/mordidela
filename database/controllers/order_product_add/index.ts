import mysql from "database";
import PedidoProdutoAdicional from "@models/pedido_produto_adicional";

export async function insertPedidoProdutoAdicional(
  id_pedido: PedidoProdutoAdicional["id_pedido"],
  id_produto: PedidoProdutoAdicional["id_produto"],
  adicionais: PedidoProdutoAdicional["id_adicional"][]
) {
  const values = adicionais.map((add) => `(?, ?, ?)`);
  const params = [];
  for (let i in adicionais) {
    params.push(id_pedido, id_produto, adicionais[i]);
  }
  const query = `INSERT INTO pedido_produto_adicional(id_pedido,id_produto,id_adicional) VALUES ${values.join(
    ", "
  )}`;
  const result = await mysql.query(query, params);
  await mysql.end();
}
