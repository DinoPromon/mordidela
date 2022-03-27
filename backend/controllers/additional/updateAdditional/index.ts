import { Prisma } from "@backend";
import { throwError } from "@errors/index";

import { UpdateAdditionalValidator } from "./validator";

import type { UpdateAdditionalArg } from "./types";

export class UpdateAdditional {
  private updateArg: UpdateAdditionalArg;
  private validator: UpdateAdditionalValidator;

  constructor(updateArg: UpdateAdditionalArg) {
    this.updateArg = updateArg;
    this.validator = new UpdateAdditionalValidator(this.updateArg);
  }

  public async exec() {
    this.validator.validate();

    const updateArg = await this.updateAdditional();

    return updateArg;
  }

  private async updateAdditional() {
    const { id_adicional, ...updateArg } = this.updateArg;
    const updatedAdditional = await Prisma.adicional
      .update({
        data: {
          ...updateArg,
        },
        where: {
          id_adicional: this.updateArg.id_adicional,
        },
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Algo de inesperado aconteceu" });
      });

    return updatedAdditional;
  }
}
