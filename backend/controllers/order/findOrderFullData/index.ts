import { Prisma } from "@backend";
import { throwError } from "@errors/index";

import { FindOrderFullDataValidtor } from "./validator";
import { UUIDParse } from "@helpers/uuid";

import type { IOrderFullData } from "@models/pedido";
import type { FindOrderFullDataArg } from "./types";

export class FindOrderFullData {
  private findArg: FindOrderFullDataArg;
  private validator: FindOrderFullDataValidtor;

  constructor(findArg: FindOrderFullDataArg) {
    this.findArg = findArg;
    this.validator = new FindOrderFullDataValidtor(this.findArg);
  }

  public async exec() {
    this.validator.validate();

    const orderFullData = await this.findFullData();

    return orderFullData;
  }

  private async findFullData() {
    const orderFullData = await Prisma.pedido
      .findUnique({
        where: {
          id_pedido: this.findArg.id_pedido,
        },
        include: {
          usuario: {
            include: {
              telefone: true,
            },
          },
          cupom: true,
          endereco: true,
          pedido_produto: {
            include: {
              produto: true,
            },
          },
          pedido_produto_adicional: {
            include: {
              adicional: true,
            },
          },
          pedido_produto_sabor: {
            include: {
              sabor: true,
            },
          },
        },
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Algo de inesperado aconteceu" });
      });

    if (!orderFullData) throwError("O-C-DI", { customMessage: "Pedido não encontrado" });

    return {
      ...orderFullData,
      pedido_produto: orderFullData.pedido_produto.map((orderProduct) => ({
        ...orderProduct,
        produto: {
          ...orderProduct.produto,
          uuid: UUIDParse.getStringUUID(orderProduct.produto.uuid),
        },
      })),
    } as IOrderFullData;
  }
}
