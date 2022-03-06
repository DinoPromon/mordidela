import { throwError } from "@errors/index";
import { OrderRepo } from "@repository/order";
import { UUIDParse } from "@helpers/uuid";
import { DateSerializer } from "@helpers/date/serializer";
import { FindAllOrdersRelationsByUserIdValidator } from "./validator";

import type IPedido from "@models/pedido";
import type IUsuario from "@models/usuario";
import type IUsuarioCupom from "@models/usuario_cupom";
import type { IOrderRelations } from "@models/pedido";
import type { IOrderProductRelations } from "@models/pedido_produto";

export class FindAllOrderRelationsByUserId {
  private userId: IUsuario["id_usuario"];
  private itemsAmount?: number;
  private lastOrderId?: IPedido["id_pedido"];
  private validator: FindAllOrdersRelationsByUserIdValidator;

  constructor(
    userId: IUsuario["id_usuario"],
    itemsAmount?: number,
    lastOrderId?: IPedido["id_pedido"]
  ) {
    this.userId = userId;
    this.itemsAmount = itemsAmount;
    this.lastOrderId = lastOrderId;
    this.validator = new FindAllOrdersRelationsByUserIdValidator(userId, itemsAmount, lastOrderId);
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
    const ordersWithRelations = await OrderRepo.findAllRelationsByUserId(
      this.userId,
      this.itemsAmount || 10,
      this.lastOrderId
    );

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
