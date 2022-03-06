import { Prisma } from "@backend";
import { throwError } from "@errors/index";
import { CreateOrderValidator } from "./validator";

import type ICupom from "@models/cupom";
import type IPedido from "@models/pedido";
import type IUsuario from "@models/usuario";
import type IAdicional from "@models/adicional";
import type IUsuarioCupom from "@models/usuario_cupom";
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

    const { id_pedido: createdOrderId } = await this.createOrder();

    if (this.orderData.id_cupom) {
      await this.createCouponRelation(createdOrderId, this.orderData.id_cupom).catch((err) =>
        throwError("O-C", { customMessage: "Erro na criação da relação pedido e cupom" })
      );
    }
    await this.createProductRelations(createdOrderId).catch((err) =>
      throwError("O-C", { customMessage: "Erro na criação da relação pedido e produto" })
    );

    await this.giveFidelityCoupon().catch((err) => throwError("O-C"));
  }

  private async createCouponRelation(orderId: IPedido["id_pedido"], couponId: ICupom["id_cupom"]) {
    const createdUserCoupon = await Prisma.usuario_cupom
      .create({
        data: {
          id_usuario: this.userId,
          id_cupom: couponId,
          id_pedido: orderId,
          data_uso: new Date(),
          foi_usado: true,
        },
      })
      .catch((err) => throwError("O-C"));

    return createdUserCoupon as IUsuarioCupom;
  }

  private async giveFidelityCoupon() {
    const fidelityCoupons = (await Prisma.cupom.findMany({
      where: {
        fidelidade: true,
      },
    })) as ICupom[];

    const userOrdersAmount = await Prisma.pedido.count({
      where: {
        id_usuario: this.userId,
      },
    });

    for (const coupon of fidelityCoupons) {
      if (userOrdersAmount % coupon.qtde_min_pedido === 0) {
        await Prisma.usuario_cupom.create({
          data: {
            id_cupom: coupon.id_cupom,
            id_usuario: this.userId,
            data_uso: null,
            foi_usado: false,
            id_pedido: null,
          },
        });
        return;
      }
    }
  }

  private async createProductRelations(orderId: IPedido["id_pedido"]) {
    const allAdds = (await Prisma.adicional.findMany()) as IAdicional[];

    this.productsData.forEach(async (product) => {
      const selectedAdds = allAdds.filter((add) =>
        product.adicionais.find((orderAddId) => orderAddId === add.id_adicional)
      );

      const createdOrderProduct = (await Prisma.pedido_produto.create({
        data: {
          id_pedido: orderId,
          id_produto: product.id_produto,
          quantidade: product.quantidade,
          observacao: product.observacao,
          preco_pedido: 0,
        },
      })) as IPedidoProduto;

      await Prisma.pedido_produto_adicional.createMany({
        data: selectedAdds.map((add) => ({
          id_pedido_produto: createdOrderProduct.id_pedido_produto,
          id_pedido: orderId,
          id_produto: product.id_produto,
          id_adicional: add.id_adicional,
          preco_adicional: add.preco,
        })),
      });

      await Prisma.pedido_produto_sabor.createMany({
        data: product.sabores.map((flavorId) => ({
          id_pedido_produto: createdOrderProduct.id_pedido_produto,
          id_pedido: orderId,
          id_produto: product.id_produto,
          id_sabor: flavorId,
        })),
      });
    });
  }

  private async createOrder() {
    const createdOrderId = await Prisma.pedido.create({
      data: this.orderData,
    });
    return createdOrderId as IPedido;
  }
}
