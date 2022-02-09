import IPedidoProdutoAdicional from "@models/pedido_produto_adicional";
import { Prisma } from "@database";

export class OrderProductAddRepo {
  public static async createMany(
    id_pedido: IPedidoProdutoAdicional["id_pedido"],
    id_produto: IPedidoProdutoAdicional["id_produto"],
    adicionais: IPedidoProdutoAdicional["id_adicional"][]
  ) {
    const createdOrderProductAdds = await Prisma.pedido_produto_adicional.createMany({
      data: adicionais.map((addId) => ({
        id_pedido,
        id_produto,
        id_adicional: addId,
      })),
    });

    return createdOrderProductAdds;
  }
}
