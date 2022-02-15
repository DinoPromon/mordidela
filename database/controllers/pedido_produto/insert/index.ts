import { Prisma } from "database";
import IPedidoProduto from "@models/pedido_produto";

export async function createOrderProduct(createOrderProductData: IPedidoProduto) {
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
