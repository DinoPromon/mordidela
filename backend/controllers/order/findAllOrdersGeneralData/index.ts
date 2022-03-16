import { Prisma } from "@backend";
import { throwError } from "@errors/index";
import { PaginationHelper } from "@helpers/pagination";

import type { IOrderGeneralData } from "@models/pedido";
import type { PaginatedSearchArg } from "@helpers/pagination/types";
import type { PaginatedResponse } from "@my-types/backend/pagination";

export class FindAllOrderGeneralData {
  private paginationHelper: PaginationHelper;

  constructor(paginationData: PaginatedSearchArg) {
    this.paginationHelper = new PaginationHelper(paginationData);
  }

  public async exec() {
    const ordersGeneralData = await this.findAll();
    const countOrdersGeneralData = await this.countFindAll();

    return {
      count: countOrdersGeneralData,
      items: ordersGeneralData,
    } as PaginatedResponse<IOrderGeneralData>;
  }

  private async countFindAll() {
    const count = await Prisma.pedido.count();

    return count;
  }

  private async findAll() {
    const { itemsAmount, skip } = this.paginationHelper.getPaginationData();

    const ordersGeneralData = await Prisma.pedido
      .findMany({
        include: {
          endereco: true,
          usuario: {
            select: {
              id_usuario: true,
              nome: true,
              telefone: true,
            },
          },
        },
        take: itemsAmount,
        orderBy: {
          id_pedido: "asc",
        },
        skip: skip,
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Algo de inesperado aconteceu" });
      });

    return ordersGeneralData as IOrderGeneralData[];
  }
}
