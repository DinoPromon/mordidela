import { Prisma } from "@backend";
import { throwError } from "@errors/index";
import { PaginationHelper } from "@helpers/pagination";

import { FindAllOrderGeneralDataParser } from "./parser";

import type { IOrderGeneralData } from "@models/pedido";
import type { PaginatedSearchArg } from "@helpers/pagination/types";
import type { PaginatedResponse } from "@my-types/backend/pagination";

import type { FiltersData, RawFiltersData } from "./types/filter";

export class FindAllOrderGeneralData {
  private paginationHelper: PaginationHelper;
  private filtersData: FiltersData;

  constructor(rawFiltersData: RawFiltersData, paginationData: PaginatedSearchArg) {
    const parser = new FindAllOrderGeneralDataParser(rawFiltersData);

    this.filtersData = parser.parse();
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
    const count = await Prisma.pedido
      .count({
        where: {
          ...this.filtersData,
        },
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Algo de inesperado aconteceu" });
      });

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
        where: {
          ...this.filtersData,
        },
        orderBy: {
          id_pedido: "desc",
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
