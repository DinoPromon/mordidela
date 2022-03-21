import { Prisma } from "@backend";
import { throwError } from "@errors/index";
import { UUIDParse } from "@helpers/uuid";
import { PaginationHelper } from "@helpers/pagination";

import { FindAllOrderRelationsByUserIdValidator } from "./validator";

import type { IOrderRelations } from "@models/pedido";
import type { PaginatedSearchArg } from "@helpers/pagination/types";
import type { PaginatedResponse } from "@my-types/backend/pagination";
import type { FindAllOrderRelationsByUserIdArg } from "./types";

export class FindAllOrderRelationsByUserId {
  private findAllArg: FindAllOrderRelationsByUserIdArg;
  private validator: FindAllOrderRelationsByUserIdValidator;
  private paginationHelper: PaginationHelper;

  constructor(findAllArg: FindAllOrderRelationsByUserIdArg, paginationData?: PaginatedSearchArg) {
    this.findAllArg = findAllArg;
    this.validator = new FindAllOrderRelationsByUserIdValidator(findAllArg);
    this.paginationHelper = new PaginationHelper(paginationData);
  }

  public async exec() {
    this.validator.validate();
    try {
      const orderRelationsData = await this.findAllRelationsByUserId();

      const serializedOrderRelationsData = this.getSerializedOrdersRelations(
        orderRelationsData as IOrderRelations[]
      );

      const countOrderRelationsData = await this.countFindAllRelationsByUserId();

      return {
        count: countOrderRelationsData,
        items: serializedOrderRelationsData,
      } as PaginatedResponse<IOrderRelations>;
    } catch (err) {
      return throwError("O-FA");
    }
  }

  private async countFindAllRelationsByUserId() {
    const count = await Prisma.pedido.count({
      where: {
        id_usuario: this.findAllArg.userId,
      },
    });

    return count;
  }

  private async findAllRelationsByUserId() {
    const { itemsAmount, skip } = this.paginationHelper.getPaginationData();

    const ordersWithRelations = await Prisma.pedido
      .findMany({
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
          id_usuario: this.findAllArg.userId,
        },
        take: itemsAmount,
        orderBy: {
          id_pedido: "desc",
        },
        skip: skip,
      })
      .catch((err) => throwError("O-FA"));

    return ordersWithRelations as unknown;
  }

  private getSerializedOrdersRelations(ordersRelations: IOrderRelations[]) {
    const serializedOrdersRelations = ordersRelations.map((orderRelations) => ({
      ...orderRelations,
      pedido_produto: orderRelations.pedido_produto.map((orderProduct) => ({
        ...orderProduct,
        produto: {
          ...orderProduct.produto,
          uuid: UUIDParse.getStringUUID(orderProduct.produto.uuid as unknown as Buffer),
        },
      })),
    }));

    return serializedOrdersRelations;
  }
}
