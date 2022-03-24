import { Prisma } from "@backend";
import { throwError } from "@errors/index";

import { UpdateFlavorValidator } from "./validator";

import type { UpdateFlavorArg } from "./types";

export class UpdateFlavor {
  private updateArg: UpdateFlavorArg;
  private validator: UpdateFlavorValidator;

  constructor(updateArg: UpdateFlavorArg) {
    this.updateArg = updateArg;
    this.validator = new UpdateFlavorValidator(this.updateArg);
  }

  public async exec() {
    this.validator.validate();

    const updateArg = await this.updateFlavor();

    return updateArg;
  }

  private async updateFlavor() {
    const { id_sabor, ...updateArg } = this.updateArg;
    const updatedFlavor = await Prisma.sabor
      .update({
        data: {
          ...updateArg,
        },
        where: {
          id_sabor: this.updateArg.id_sabor,
        },
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Algo de inesperado aconteceu" });
      });

    return updatedFlavor;
  }
}
