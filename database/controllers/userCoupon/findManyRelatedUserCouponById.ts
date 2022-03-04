import { Prisma } from "@database";
import { DateSerializer } from "database/helpers/date/serializer";

import type ICupom from "@models/cupom";
import type IPedido from "@models/pedido";
import type IUsuarioCupom from "@models/usuario_cupom";

type RelatedCoupon = IUsuarioCupom & {
  cupom: ICupom;
  pedido: IPedido | null;
};

export class FindManyRelatedUserCouponByUserId {
  private userId: IUsuarioCupom["id_usuario"];

  constructor(userId: IUsuarioCupom["id_usuario"]) {
    this.userId = userId;
  }

  public async exec() {
    const relatedCoupons = await this.findMany();
    const relatedCouponsDateSerialized = relatedCoupons.map((relatedCoupon) => ({
      ...relatedCoupon,
      data_obtencao: DateSerializer.serialize(relatedCoupon.data_obtencao),
      data_uso: DateSerializer.serialize(relatedCoupon.data_uso),
      cupom: DateSerializer.serializeCoupon(relatedCoupon.cupom),
      pedido: relatedCoupon.pedido ? this.getSerializedOrder(relatedCoupon.pedido) : null,
    }));

    return relatedCouponsDateSerialized;
  }

  private getSerializedOrder(order: IPedido) {
    const serializedOrder = {
      ...order,
      data_pedido: DateSerializer.serialize(order.data_pedido),
      data_confirmacao: DateSerializer.serialize(order.data_confirmacao),
    } as IPedido;

    return serializedOrder;
  }

  private async findMany() {
    const relatedCoupons: RelatedCoupon[] = (await Prisma.usuario_cupom.findMany({
      where: {
        id_usuario: this.userId,
      },
      include: {
        cupom: true,
        pedido: true,
      },
    })) as RelatedCoupon[];

    return relatedCoupons;
  }
}
