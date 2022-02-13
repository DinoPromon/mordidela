import IUsuarioCupom from "@models/usuario_cupom";
import { Prisma } from "@database";
import { DateOwner } from "database/helpers/date";
import { createDate } from "@utils/transformation/date";

import type ICupom from "@models/cupom";
import type IPedido from "@models/pedido";

type RelatedCoupon = IUsuarioCupom & {
  cupom: ICupom;
  pedido: IPedido | null;
};

export class FindManyRelatedUserCouponByUserId extends DateOwner {
  private userId: IUsuarioCupom["id_usuario"];

  constructor(userId: IUsuarioCupom["id_usuario"]) {
    super();
    this.userId = userId;
  }

  public async exec() {
    const relatedCoupons = await this.findMany();
    const relatedCouponsDateSerialized = relatedCoupons.map((relatedCoupon) => ({
      ...relatedCoupon,
      data_obtencao: this.getSerializedDate(relatedCoupon.data_obtencao),
      data_uso: this.getSerializedDate(relatedCoupon.data_uso),
      cupom: this.getSerializedCoupon(relatedCoupon.cupom),
      pedido: relatedCoupon.pedido ? this.getSerializedOrder(relatedCoupon.pedido) : null,
    }));

    return relatedCouponsDateSerialized;
  }

  private getSerializedOrder(order: IPedido) {
    const serializedOrder = {
      ...order,
      data_pedido: this.getSerializedDate(order.data_pedido),
      data_confirmacao: this.getSerializedDate(order.data_confirmacao),
    } as IPedido;

    return serializedOrder;
  }

  private getSerializedCoupon(coupon: ICupom) {
    const serializedCupom = {
      ...coupon,
      data_criacao: this.getSerializedDate(coupon.data_criacao),
      data_fim: this.getSerializedDate(coupon.data_fim),
      data_inicio: this.getSerializedDate(coupon.data_inicio),
    } as ICupom;

    return serializedCupom;
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
