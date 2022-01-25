import Pedido from "@models/pedido";
import { CartProduto } from "@models/produto";
import { createOrderProduct } from "@controllers/pedido_produto";
import { createManyOrderProductAdds } from "@controllers/pedido_produto_adicional";
import { createManyOrderProductFlavors } from "@controllers/pedido_produto_sabor";

export async function createAllProductOrderRelations(
  orderId: Pedido["id_pedido"],
  products: CartProduto[]
) {
  products.forEach(async (product) => {
    if (product.adicionais.length) {
      await createManyOrderProductAdds(orderId, product.id_produto, product.adicionais);
    }

    if (product.sabores.length) {
      await createManyOrderProductFlavors(orderId, product.id_produto, product.sabores);
    }

    await createOrderProduct({
      id_pedido: orderId,
      id_produto: product.id_produto,
      observacao: product.observacao,
      quantidade: product.quantidade,
    });
  });
}
