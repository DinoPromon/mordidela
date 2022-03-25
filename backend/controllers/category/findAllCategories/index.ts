import { Prisma } from "@backend";
import { PaginationHelper } from "@helpers/pagination";

import { throwError } from "@errors/index";

import { FindAllCategoriesParser } from "./parser";

import type ICategoria from "@models/categoria";
import type { PaginatedSearchArg } from "@helpers/pagination/types";
import type { RawFindAllCategoriesArg, FindAllCategoriesArg } from "./types";

export class FindAllCategories {
  private findAllArg: FindAllCategoriesArg;
  private paginationHelper: PaginationHelper;

  constructor(rawFindAllArg: RawFindAllCategoriesArg, paginationData: PaginatedSearchArg) {
    const rawFindAllArgParser = new FindAllCategoriesParser(rawFindAllArg);

    this.findAllArg = rawFindAllArgParser.parse();
    this.paginationHelper = new PaginationHelper(paginationData);
  }

  public async exec() {
    const allCategories = await this.findAll();

    return allCategories;
  }

  private async findAll() {
    const { itemsAmount, skip } = this.paginationHelper.getPaginationData();

    const allCategories = await Prisma.categoria
      .findMany({
        where: {
          deletado: this.findAllArg.getDeleted,
        },
        take: itemsAmount,
        skip: skip,
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Algo de inesperado aconteceu" });
      });

    return allCategories as ICategoria[];
  }
}
