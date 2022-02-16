import { Prisma } from "@database";
import { throwError } from "@errors/index";

import type { CartPedido } from "@models/pedido";

export class OrderRepo {
  public static async findAll() {
    try {
      const orders = await Prisma.pedido.findMany();
      return orders;
    } catch (error) {
      return throwError("O-FA");
    }
  }

  public static async countByUserId(userId: number) {
    try {
      const ordersCount = await Prisma.pedido.count({
        where: {
          id_usuario: userId,
        },
      });

      return ordersCount;
    } catch (error) {
      return throwError("O-CT-UID");
    }
  }

  public static async countByCupomId(cupomId: number) {
    try {
      const ordersCount = await Prisma.pedido.count({
        where: {
          id_cupom: cupomId,
        },
      });

      return ordersCount;
    } catch (error) {
      return throwError("O-CT-CID");
    }
  }

  public static async create(cartOrder: CartPedido) {
    try {
      const { id_cupom, id_endereco, id_usuario, tipo_entrega, tipo_pagamento, troco_para } =
        cartOrder;

      const [result] = (await Prisma.$queryRaw`
        SELECT f_insert_pedido(${id_cupom}, ${id_usuario}, ${id_endereco}, ${tipo_entrega}, ${tipo_pagamento}, ${troco_para})
      `) as unknown[];

      const createdOrderId = Object.values(result as { [key: string]: unknown })[0] as number;
      return createdOrderId;
    } catch (error) {
      return throwError("O-C");
    }
  }
}
