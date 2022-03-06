import { Prisma } from "@backend";

import type IPedidoProdutoSabor from "@models/pedido_produto_sabor";
import type IPedidoProduto from "@models/pedido_produto";

export class OrderProductFlavorRepo {
  public static async createMany(
    id_pedido_produto: IPedidoProduto["id_pedido_produto"],
    id_pedido: IPedidoProdutoSabor["id_pedido"],
    id_produto: IPedidoProdutoSabor["id_produto"],
    sabores: IPedidoProdutoSabor["id_sabor"][]
  ) {
    const createdOrderProductFlavors = await Prisma.pedido_produto_sabor.createMany({
      data: sabores.map((flavorId) => ({
        id_pedido_produto,
        id_pedido,
        id_produto,
        id_sabor: flavorId,
      })),
    });

    return createdOrderProductFlavors;
  }
}
