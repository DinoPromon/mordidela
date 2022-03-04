import { AddRepo } from "@repository/add";
import { throwError } from "@errors/index";
import { CupomRepo } from "@repository/cupom";
import { OrderRepo } from "@repository/order";
import { CreateOrderValidator } from "./validator";
import { UserCouponRepo } from "@repository/user-cupom";
import { OrderProductRepo } from "@repository/order-product";
import { OrderProductAddRepo } from "@repository/order-product-add";
import { OrderProductFlavorRepo } from "@repository/order-product-flavor";

import type ICupom from "@models/cupom";
import type IPedido from "@models/pedido";
import type IUsuario from "@models/usuario";
import type IAdicional from "@models/adicional";
import type IPedidoProduto from "@models/pedido_produto";
import type { CartPedido } from "@models/pedido";
import type { CartProduto } from "@models/produto";

export type CreateOrderData = {
  orderData: CartPedido;
  productsData: CartProduto[];
};

export class CreateOrder {
  protected userId: IUsuario["id_usuario"];
  private validator: CreateOrderValidator;
  private orderData: CartPedido;
  private productsData: CartProduto[];

  constructor(userId: IUsuario["id_usuario"], createOrderData: CreateOrderData) {
    this.userId = userId;
    this.orderData = createOrderData.orderData;
    this.productsData = createOrderData.productsData;
    this.validator = new CreateOrderValidator(createOrderData);
  }

  public async exec() {
    this.validator.validate();

    const createdOrderId = await this.createOrder();
    if (this.orderData.id_cupom) {
      await this.createCouponRelation(createdOrderId, this.orderData.id_cupom).catch((err) =>
        throwError("O-C", { customMessage: "Erro na criação da relação pedido e cupom" })
      );
    }
    await this.createProductRelations(createdOrderId).catch((err) =>
      throwError("O-C", { customMessage: "Erro na criação da relação pedido e produto" })
    );

    await this.giveFidelityCoupon();
  }

  private async createCouponRelation(orderId: IPedido["id_pedido"], couponId: ICupom["id_cupom"]) {
    const createdUserCoupon = await UserCouponRepo.create({
      id_usuario: this.userId,
      id_cupom: couponId,
      id_pedido: orderId,
      data_uso: new Date(),
      foi_usado: true,
    });

    return createdUserCoupon;
  }

  private async giveFidelityCoupon() {
    const fidelityCoupons = await CupomRepo.findAllFidelityCoupons();
    const userOrdersAmount = await OrderRepo.countByUserId(this.userId);

    for (const coupon of fidelityCoupons) {
      if (userOrdersAmount % coupon.qtde_min_pedido === 0) {
        return await UserCouponRepo.create({
          id_cupom: coupon.id_cupom,
          id_usuario: this.userId,
          data_uso: null,
          foi_usado: false,
          id_pedido: null,
        });
      }
    }
  }

  private async createProductRelations(orderId: IPedido["id_pedido"]) {
    const allAdds = (await AddRepo.findAll()) as IAdicional[];

    this.productsData.forEach(async (product) => {
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
