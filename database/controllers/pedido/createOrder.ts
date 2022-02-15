import { AddRepo } from "@repository/add";
import { OrderRepo } from "@repository/order";
import { OrderProductAddRepo } from "@repository/order-product-add";

import type IPedido from "@models/pedido";
import type IAdicional from "@models/adicional";
import type { CartPedido } from "@models/pedido";
import type { CartProduto } from "@models/produto";
import { OrderProductFlavorRepo } from "@repository/order-product-flavor";
import { OrderProductRepo } from "@repository/order-product";
import { ProductRepo } from "@repository/product";
import type IProduto from "@models/produto";

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
      await OrderProductRepo.create({
        id_pedido: orderId,
        id_produto: product.id_produto,
        quantidade: product.quantidade,
        observacao: product.observacao,
      });
      await OrderProductAddRepo.createMany(orderId, product.id_produto, selectedAdds);
      await OrderProductFlavorRepo.createMany(orderId, product.id_produto, product.sabores);
    });
  }

  private async createOrder() {
    const createdOrderId = await OrderRepo.create(this.orderData);
    return createdOrderId;
  }
}
