import { Prisma } from "@database";

import type IPedidoProduto from "@models/pedido_produto";

export class OrderProductRepo {
  public static async create(createOrderProductData: Omit<IPedidoProduto, "preco_pedido">) {
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
}
