import { Prisma } from "@backend";
import { throwError } from "@errors/index";
import { PaginationHelper } from "@helpers/pagination";

import type { IOrderGeneralData } from "@models/pedido";
import type { PaginatedSearchArg } from "@helpers/pagination/types";

export class FindAllOrderGeneralData {
  private paginationHelper: PaginationHelper;

  constructor(paginationData: PaginatedSearchArg) {
    this.paginationHelper = new PaginationHelper(paginationData);
  }

  public async exec() {
    const ordersGeneralData = await this.findAll();

    return ordersGeneralData;
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
