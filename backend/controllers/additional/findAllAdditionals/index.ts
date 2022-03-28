import { Prisma } from "@backend";
import { PaginationHelper } from "@helpers/pagination";

import { throwError } from "@errors/index";

import { FindAllAdditionalsParser } from "./parser";

import type IAdicional from "@models/adicional";
import type { PaginatedSearchArg } from "@helpers/pagination/types";
import type { PaginatedResponse } from "@my-types/backend/pagination";
import type { RawFindAllAdditionalsArg, FindAllAdditionalsArg } from "./types";

export class FindAllAdditionals {
  private findAllArg: FindAllAdditionalsArg;
  private paginationHelper: PaginationHelper;

  constructor(rawFindAllArg: RawFindAllAdditionalsArg, paginationData: PaginatedSearchArg) {
    const rawFindAllArgParser = new FindAllAdditionalsParser(rawFindAllArg);

    this.findAllArg = rawFindAllArgParser.parse();
    this.paginationHelper = new PaginationHelper(paginationData);
  }

  public async exec() {
    const countAdditionals = await this.countAll();
    const allAdditionals = await this.findAll();

    return {
      count: countAdditionals,
      items: allAdditionals,
    } as PaginatedResponse<IAdicional>;
  }

  private async countAll() {
    const count = await Prisma.adicional
      .count({
        where: {
          deletado: this.findAllArg.getDeleted ? undefined : false,
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

    const allAdditionals = await Prisma.adicional
      .findMany({
        where: {
          deletado: this.findAllArg.getDeleted ? undefined : false,
        },
        take: itemsAmount,
        skip: skip,
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Algo de inesperado aconteceu" });
      });

    return allAdditionals as IAdicional[];
  }
}
