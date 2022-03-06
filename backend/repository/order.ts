import { Prisma } from "@backend";
import { throwError } from "@errors/index";

import type { CartPedido } from "@models/pedido";
import IPedido from "@models/pedido";
import IUsuario from "@models/usuario";

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

  public static async findAllRelationsByUserId(
    userId: IUsuario["id_usuario"],
    itemsAmount: number,
    lastOrderId?: IPedido["id_pedido"]
  ) {
    try {
      const ordersWithRelations = await Prisma.pedido.findMany({
        include: {
          cupom: true,
          endereco: true,
          pedido_produto: {
            include: {
              produto: true,
            },
          },
          pedido_produto_adicional: {
            include: {
              adicional: true,
            },
          },
          pedido_produto_sabor: {
            include: {
              sabor: true,
            },
          },
          usuario_cupom: true,
        },
        where: {
          id_usuario: userId,
        },
        cursor: lastOrderId
          ? {
              id_pedido: lastOrderId,
            }
          : undefined,
        skip: 1,
        orderBy: {
          id_pedido: "asc",
        },
        // take: itemsAmount,
      });

      return ordersWithRelations;
    } catch (error) {
      console.log(error);
      return throwError("O-FA");
    }
  }
}
