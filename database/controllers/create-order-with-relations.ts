import Pedido from "@models/pedido";
import { CartProduto } from "@models/produto";
import { OrderProductRepo } from "@repository/order-product";
import { OrderProductAddRepo } from "@repository/order-product-add";
import { OrderProductFlavorRepo } from "@repository/order-product-flavor";
import { CartOrderProduct } from "@models/pedido_produto";

export async function createManyProductOrderRelations(
  orderId: Pedido["id_pedido"],
  products: CartProduto[]
) {
  products.forEach(async (product) => {
    if (product.adicionais.length) {
      await OrderProductAddRepo.createMany(orderId, product.id_produto, product.adicionais);
    }

    if (product.sabores.length) {
      await OrderProductFlavorRepo.createMany(orderId, product.id_produto, product.sabores);
    }

    const cartOrderProduct: CartOrderProduct = {
      id_pedido: orderId,
      id_produto: product.id_produto,
      observacao: product.observacao,
      quantidade: product.quantidade,
    };
    await OrderProductRepo.createOrderProduct(cartOrderProduct);
  });
}
