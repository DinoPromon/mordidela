import { Prisma } from "@backend";

import { throwError } from "@errors/index";
import { StatusPedido } from "@models/pedido";
import { UpdateOrderStatusValidator } from "./validator";

import type IPedido from "@models/pedido";
import type { UpdateOrderStatusArg } from "./types";

export class UpdateOrderStatus {
  private updateArg: UpdateOrderStatusArg;
  private validator: UpdateOrderStatusValidator;

  constructor(updateArg: UpdateOrderStatusArg) {
    this.updateArg = updateArg;
    this.validator = new UpdateOrderStatusValidator(this.updateArg);
  }

  public async exec() {
    this.validator.validate();

    return await this.updateOrder();
  }

  private async updateOrder() {
    const updatedOrder = await Prisma.pedido
      .update({
        where: {
          id_pedido: this.updateArg.id_pedido,
        },
        data: {
          status_pedido: this.updateArg.status_pedido as StatusPedido,
          data_confirmacao: new Date(),
        },
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Algo de inesperado aconteceu" });
      });

    return updatedOrder as IPedido;
  }
}
