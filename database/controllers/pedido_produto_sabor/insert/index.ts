import { Prisma } from "database";
import PedidoProdutoSabor from "@models/pedido_produto_sabor";

export async function createManyOrderProductFlavors(
  id_pedido: PedidoProdutoSabor["id_pedido"],
  id_produto: PedidoProdutoSabor["id_produto"],
  sabores: PedidoProdutoSabor["id_sabor"][]
) {
  console.log(id_pedido, id_produto, sabores);
  const createdOrderProductFlavors = await Prisma.pedido_produto_sabor.createMany({
    data: sabores.map((flavorId) => ({
      id_pedido,
      id_produto,
      id_sabor: flavorId,
    })),
  });
}
