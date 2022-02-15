import IPedidoProdutoAdicional from "@models/pedido_produto_adicional";
import { Prisma } from "@database";
import IAdicional from "@models/adicional";

export class OrderProductAddRepo {
  public static async createMany(
    id_pedido: IPedidoProdutoAdicional["id_pedido"],
    id_produto: IPedidoProdutoAdicional["id_produto"],
    adicionais: IAdicional[]
  ) {
    const createdOrderProductAdds = await Prisma.pedido_produto_adicional.createMany({
      data: adicionais.map((add) => ({
        id_pedido,
        id_produto,
        id_adicional: add.id_adicional,
        preco_adicional: add.preco,
      })),
    });

    return createdOrderProductAdds;
  }
}
