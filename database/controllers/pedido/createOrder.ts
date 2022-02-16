import { AddRepo } from "@repository/add";
import { OrderRepo } from "@repository/order";
import { UserCupomRepo } from "@repository/user-cupom";
import { OrderProductRepo } from "@repository/order-product";
import { OrderProductAddRepo } from "@repository/order-product-add";
import { OrderProductFlavorRepo } from "@repository/order-product-flavor";

import type IPedido from "@models/pedido";
import type IAdicional from "@models/adicional";
import type { CartPedido } from "@models/pedido";
import type { CartProduto } from "@models/produto";

import type IUsuario from "@models/usuario";
import type IPedidoProduto from "@models/pedido_produto";
import ICupom from "@models/cupom";

export class CreateOrder {
  private orderData: CartPedido;
  private products: CartProduto[];
  private userId: IUsuario["id_usuario"];

  constructor(userId: IUsuario["id_usuario"], orderData: CartPedido, products: CartProduto[]) {
    this.orderData = orderData;
    this.products = products;
    this.userId = userId;
  }

  public async exec() {
    const createdOrderId = await this.createOrder();
    if (this.orderData.id_cupom) {
      await this.createCouponRelation(createdOrderId, this.orderData.id_cupom);
    }
    await this.createProductRelations(createdOrderId);
  }

  private async createCouponRelation(orderId: IPedido["id_pedido"], couponId: ICupom["id_cupom"]) {
    const createdUserCoupon = await UserCupomRepo.create({
      id_usuario: this.userId,
      id_cupom: couponId,
      id_pedido: orderId,
      data_uso: new Date(),
      foi_usado: true,
    });

    return createdUserCoupon;
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
