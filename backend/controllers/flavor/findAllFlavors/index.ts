import { Prisma } from "@backend";
import { PaginationHelper } from "@helpers/pagination";

import { throwError } from "@errors/index";

import { FindAllFlavorsParser } from "./parser";

import type ISabor from "@models/sabor";
import type { PaginatedSearchArg } from "@helpers/pagination/types";
import type { PaginatedResponse } from "@my-types/backend/pagination";
import type { RawFindAllFlavorsArg, FindAllFlavorsArg } from "./types";

export class FindAllFlavors {
  private findAllArg: FindAllFlavorsArg;
  private paginationHelper: PaginationHelper;

  constructor(rawFindAllArg: RawFindAllFlavorsArg, paginationData: PaginatedSearchArg) {
    const rawFindAllArgParser = new FindAllFlavorsParser(rawFindAllArg);

    this.findAllArg = rawFindAllArgParser.parse();
    this.paginationHelper = new PaginationHelper(paginationData);
  }

  public async exec() {
    const countFlavors = await this.countAll();
    const allFlavors = await this.findAll();

    return {
      count: countFlavors,
      items: allFlavors,
    } as PaginatedResponse<ISabor>;
  }

  private async countAll() {
    const count = await Prisma.sabor.count({
      where: {
        deletado: this.findAllArg.getDeleted ? undefined : false,
      },
    });

    return count;
  }

  private async findAll() {
    const { itemsAmount, skip } = this.paginationHelper.getPaginationData();

    const allFlavors = await Prisma.sabor
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

    return allFlavors as ISabor[];
  }
}
