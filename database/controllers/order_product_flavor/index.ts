import mysql from "database";
import PedidoProdutoSabor from "@models/pedido_produto_sabor";

export async function insertPedidoProdutoSabor(
  id_pedido: PedidoProdutoSabor["id_pedido"],
  id_produto: PedidoProdutoSabor["id_produto"],
  sabores: PedidoProdutoSabor["id_sabor"][]
) {
  const values = sabores.map((sabor) => `(?, ?, ?)`);
  const params = [];
  for (let i in sabores) {
    params.push(id_pedido, id_produto, sabores[i]);
  }
  const query = `INSERT INTO pedido_produto_sabor(id_pedido,id_produto,id_sabor) VALUES ${values.join(", ")}`;

  const result = await mysql.query(query, params);
}
