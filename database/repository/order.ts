import { Prisma } from "@database";
import { CupomRepo } from "./cupom";
import { CartPedido } from "@models/pedido";

export class OrderRepo {
  public static async findAll() {
    const orders = await Prisma.pedido.findMany();
    return orders;
  }

  public static async countByUserId(userId: number) {
    const ordersCount = await Prisma.pedido.count({
      where: {
        id_usuario: userId,
      },
    });

    return ordersCount;
  }

  public static async countByCupomId(cupomId: number) {
    const ordersCount = await Prisma.pedido.count({
      where: {
        id_cupom: cupomId,
      },
    });

    return ordersCount;
  }

  public static async createOrder(cartOrder: CartPedido) {
    const { id_cupom, id_endereco, id_usuario, tipo_entrega, tipo_pagamento, troco_para } =
      cartOrder;
    const cupom = id_cupom ? await CupomRepo.findByCupomId(id_cupom) : null;
    const cupomCode = cupom ? cupom.codigo : null;

    const [result] = (await Prisma.$queryRaw`
      SELECT f_insert_pedido(${cupomCode}, ${id_usuario}, ${id_endereco}, ${tipo_entrega}, ${tipo_pagamento}, ${troco_para})
    `) as unknown[];

    const createdOrderId = Object.values(result as { [key: string]: unknown })[0] as number;
    return createdOrderId;
  }
}
