import mysql from "database";
import { Prisma } from "database";
import PedidoProduto, { PedidoProdutoCreate } from "@models/pedido_produto";

export async function insertPedidoProduto(data: Omit<PedidoProduto, "preco_pedido">) {
  const { id_pedido, id_produto, observacao, quantidade } = data;
  const query =
    "INSERT INTO pedido_produto(id_pedido,id_produto,quantidade, observacao) VALUES (?, ?, ?, ?)";
  const result = await mysql.query(query, [id_pedido, id_produto, quantidade, observacao]);
  await mysql.end();
}

export async function createOrderProduct(createOrderProductData: PedidoProdutoCreate) {
  const { id_pedido, id_produto, quantidade, observacao } = createOrderProductData;
  const createdOrderProduct = await Prisma.pedido_produto.create({
    data: {
      id_pedido,
      id_produto,
      quantidade,
      observacao,
      preco_pedido: 0,
    },
  });

  return createdOrderProduct;
}
