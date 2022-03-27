import { Prisma } from "@backend";

import { throwError } from "@errors/index";

import { CreateAdditionalValidator } from "./validator";

import type { CreateAdditionalsArg } from "./types";

export class CreateAdditional {
  private createArg: CreateAdditionalsArg;
  private validator: CreateAdditionalValidator;

  constructor(createArg: CreateAdditionalsArg) {
    this.createArg = createArg;
    this.validator = new CreateAdditionalValidator(this.createArg);
  }

  public async exec() {
    this.validator.validate();

    const createdFlavor = await this.createAdditional();

    return createdFlavor;
  }

  private async createAdditional() {
    const createdFlavor = await Prisma.adicional
      .create({
        data: {
          ...this.createArg,
        },
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Algo de inesperado aconteceu" });
      });

    return createdFlavor;
  }
}
