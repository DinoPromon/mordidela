import { Prisma } from "@backend";

import { throwError } from "@errors/index";

import { CreateFlavorValidator } from "./validator";

import type { CreateFlavorArg } from "./types";

export class CreateFlavor {
  private createArg: CreateFlavorArg;
  private validator: CreateFlavorValidator;

  constructor(createArg: CreateFlavorArg) {
    this.createArg = createArg;
    this.validator = new CreateFlavorValidator(this.createArg);
  }

  public async exec() {
    this.validator.validate();

    const createdFlavor = await this.createFlavor();

    return createdFlavor;
  }

  private async createFlavor() {
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
