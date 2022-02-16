import { Prisma } from "@database";
import { throwError } from "@errors/index";

import type IPedidoProduto from "@models/pedido_produto";

export class OrderProductRepo {
  public static async create(
    orderId: IPedidoProduto["id_pedido"],
    productId: IPedidoProduto["id_produto"],
    amount: IPedidoProduto["quantidade"],
    observation: IPedidoProduto["observacao"]
  ) {
    try {
      const createdOrderProduct = await Prisma.pedido_produto.create({
        data: {
          id_pedido: orderId,
          id_produto: productId,
          quantidade: amount,
          observacao: observation,
          preco_pedido: 0,
        },
      });
      return createdOrderProduct;
    } catch (err) {
      throwError("OP-C");
    }
  }
}
