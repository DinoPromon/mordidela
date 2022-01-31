import { Prisma } from "database";
import { PedidoProdutoCreate } from "@models/pedido_produto";

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
