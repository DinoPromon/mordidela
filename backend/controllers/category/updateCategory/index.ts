import { Prisma } from "@backend";
import { throwError } from "@errors/index";

import { UpdateCategoryValidator } from "./validator";

import type { UpdateCategoryArg } from "./types";

export class UpdateCategory {
  private updateArg: UpdateCategoryArg;
  private validator: UpdateCategoryValidator;

  constructor(updateArg: UpdateCategoryArg) {
    this.updateArg = updateArg;
    this.validator = new UpdateCategoryValidator(this.updateArg);
  }

  public async exec() {
    this.validator.validate();

    const updateArg = await this.updateCategory();

    return updateArg;
  }

  private async updateCategory() {
    const { id_categoria, ...updateArg } = this.updateArg;
    const updatedCategory = await Prisma.categoria
      .update({
        data: {
          ...updateArg,
        },
        where: {
          id_categoria: this.updateArg.id_categoria,
        },
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Algo de inesperado aconteceu" });
      });

    console.log(updatedCategory);

    return updatedCategory;
  }
}
