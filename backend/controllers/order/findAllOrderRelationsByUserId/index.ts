import { Prisma } from "@backend";
import { throwError } from "@errors/index";
import { UUIDParse } from "@helpers/uuid";
import { PaginationHelper } from "@helpers/pagination";
import { DateSerializer } from "@helpers/date/serializer";

import { FindAllOrderRelationsByUserIdValidator } from "./validator";

import type IUsuarioCupom from "@models/usuario_cupom";
import type { IOrderRelations } from "@models/pedido";
import type { PaginatedSearchArg } from "@helpers/pagination/types";
import type { IOrderProductRelations } from "@models/pedido_produto";
import type { FindAllOrderRelationsByUserIdArg } from "./types";

export class FindAllOrderRelationsByUserId {
  private findAllArg: FindAllOrderRelationsByUserIdArg;
  private validator: FindAllOrderRelationsByUserIdValidator;
  private paginationHelper: PaginationHelper;

  constructor(findAllArg: FindAllOrderRelationsByUserIdArg, paginationData: PaginatedSearchArg) {
    this.findAllArg = findAllArg;
    this.validator = new FindAllOrderRelationsByUserIdValidator(findAllArg);
    this.paginationHelper = new PaginationHelper(paginationData);
  }

  public async exec() {
    this.validator.validate();
    try {
      const orderRelationsData = await this.findAllRelationsByUserId();

      const serializedOrderRelationsData = this.getSerializedOrdersRelations(
        orderRelationsData as IOrderRelations[]
      );

      return serializedOrderRelationsData;
    } catch (err) {
      return throwError("O-FA");
    }
  }

  private async findAllRelationsByUserId() {
    const { itemsAmount, skip } = this.paginationHelper.getPaginationData();

    const ordersWithRelations = await Prisma.pedido
      .findMany({
        include: {
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
          usuario_cupom: true,
        },
        where: {
          id_usuario: this.findAllArg.userId,
        },
        take: itemsAmount,
        orderBy: {
          id_pedido: "asc",
        },
        skip: skip,
      })
      .catch((err) => throwError("O-FA"));

    return ordersWithRelations as unknown;
  }

  private getSerializedOrdersRelations(ordersRelations: IOrderRelations[]) {
    const serializedOrdersRelations: IOrderRelations[] = ordersRelations.map(
      (orderRelations) =>
        ({
          ...orderRelations,
          data_confirmacao: DateSerializer.serialize(orderRelations.data_confirmacao),
          data_pedido: DateSerializer.serialize(orderRelations.data_pedido),
          cupom: orderRelations.cupom ? DateSerializer.serializeCoupon(orderRelations.cupom) : null,
          usuario_cupom: this.getSerializedUserCoupons(orderRelations.usuario_cupom),
          pedido_produto: this.getSerializedOrderProduct(
            orderRelations.pedido_produto as unknown as IOrderProductRelations[]
          ),
        } as IOrderRelations)
    );

    return serializedOrdersRelations;
  }

  private getSerializedOrderProduct(ordersProducts: IOrderProductRelations[]) {
    const serializedOrdersProducts: IOrderProductRelations[] = ordersProducts.map(
      (orderProduct) => ({
        ...orderProduct,
        produto: orderProduct.produto
          ? {
              ...orderProduct.produto,
              uuid: UUIDParse.getStringUUID(orderProduct.produto.uuid as unknown as Buffer),
            }
          : undefined,
      })
    );

    return serializedOrdersProducts;
  }

  private getSerializedUserCoupons(userCoupons: IUsuarioCupom[]) {
    const serializedUserCoupons: IUsuarioCupom[] = userCoupons.map((userCoupon) =>
      DateSerializer.serializeUserCoupon(userCoupon)
    );

    return serializedUserCoupons;
  }
}
