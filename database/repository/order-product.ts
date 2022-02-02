import { Prisma } from "@database";
import { CartOrderProduct } from "@models/pedido_produto";

export class OrderProductRepo {
  public static async createOrderProduct(createOrderProductData: CartOrderProduct) {
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
