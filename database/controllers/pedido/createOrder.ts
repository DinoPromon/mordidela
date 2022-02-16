import { AddRepo } from "@repository/add";
import { OrderRepo } from "@repository/order";
import { OrderProductRepo } from "@repository/order-product";
import { OrderProductAddRepo } from "@repository/order-product-add";
import { OrderProductFlavorRepo } from "@repository/order-product-flavor";

import type IPedido from "@models/pedido";
import type IAdicional from "@models/adicional";
import type { CartPedido } from "@models/pedido";
import type { CartProduto } from "@models/produto";

import IPedidoProduto from "@models/pedido_produto";

export class CreateOrder {
  private orderData: CartPedido;
  private products: CartProduto[];

  constructor(orderData: CartPedido, products: CartProduto[]) {
    this.orderData = orderData;
    this.products = products;
  }

  public async exec() {
    const createdOrderId = await this.createOrder();
    await this.createProductRelations(createdOrderId);
  }

  private async createProductRelations(orderId: IPedido["id_pedido"]) {
    const allAdds = (await AddRepo.findAll()) as IAdicional[];

    this.products.forEach(async (product) => {
      const selectedAdds = allAdds.filter((add) =>
        product.adicionais.find((orderAddId) => orderAddId === add.id_adicional)
      );
      const createdOrderProduct = (await OrderProductRepo.create(
        orderId,
        product.id_produto,
        product.quantidade,
        product.observacao
      )) as IPedidoProduto;
      await OrderProductAddRepo.createMany(
        createdOrderProduct.id_pedido_produto,
        orderId,
        product.id_produto,
        selectedAdds
      );
      await OrderProductFlavorRepo.createMany(
        createdOrderProduct.id_pedido_produto,
        orderId,
        product.id_produto,
        product.sabores
      );
    });
  }

  private async createOrder() {
    const createdOrderId = await OrderRepo.create(this.orderData);
    return createdOrderId;
  }
}
