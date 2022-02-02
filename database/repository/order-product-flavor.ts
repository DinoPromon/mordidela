import PedidoProdutoSabor from "@models/pedido_produto_sabor";
import { Prisma } from "@database";

export class OrderProductFlavorRepo {
  public static async createMany(
    id_pedido: PedidoProdutoSabor["id_pedido"],
    id_produto: PedidoProdutoSabor["id_produto"],
    sabores: PedidoProdutoSabor["id_sabor"][]
  ) {
    const createdOrderProductFlavors = await Prisma.pedido_produto_sabor.createMany({
      data: sabores.map((flavorId) => ({
        id_pedido,
        id_produto,
        id_sabor: flavorId,
      })),
    });

    return createdOrderProductFlavors;
  }
}
