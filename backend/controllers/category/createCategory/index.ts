import { Prisma } from "@backend";

import { throwError } from "@errors/index";

import { CreateCategoryValidator } from "./validator";

import type { CreateCategoryArg } from "./types";

export class CreateCategory {
  private createArg: CreateCategoryArg;
  private validator: CreateCategoryValidator;

  constructor(createArg: CreateCategoryArg) {
    this.createArg = createArg;
    this.validator = new CreateCategoryValidator(this.createArg);
  }

  public async exec() {
    this.validator.validate();

    const createdFlavor = await this.createCategory();

    return createdFlavor;
  }

  private async createCategory() {
    const createdFlavor = await Prisma.sabor
      .create({
        data: {
          nome: this.createArg.nome,
        },
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Algo de inesperado aconteceu" });
      });

    return createdFlavor;
  }
}
