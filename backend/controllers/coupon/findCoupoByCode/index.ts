import { Prisma } from "@backend";
import { throwError } from "@errors/index";

import type ICupom from "@models/cupom";
import type IUsuario from "@models/usuario";

export class FindCouponByCode {
  private code: ICupom["codigo"];

  constructor(couponCode: ICupom["codigo"]) {
    this.code = couponCode;
  }

  private async checkFidelityCouponUsabilty(
    couponId: ICupom["id_cupom"],
    userId: IUsuario["id_usuario"]
  ) {
    const hasUnusedCoupon = !!(await Prisma.usuario_cupom.findFirst({
      where: {
        id_cupom: couponId,
        id_usuario: userId,
        foi_usado: false,
      },
      orderBy: {
        data_obtencao: "asc",
      },
    }));

    return hasUnusedCoupon;
  }

  public async verifyCouponUsability(coupon: ICupom, userId: IUsuario["id_usuario"]) {
    if (coupon.fidelidade) {
      const isUsable = await this.checkFidelityCouponUsabilty(coupon.id_cupom, userId);
      return isUsable;
    }

    const isCouponUsedByUser = !!(await Prisma.usuario_cupom.findFirst({
      where: {
        id_cupom: coupon.id_cupom,
        id_usuario: userId,
        foi_usado: true,
      },
    }));

    return isCouponUsedByUser ? false : true;
  }

  public verifyCouponValidty(coupon: ICupom) {
    const startDate = new Date(coupon.data_inicio || "");
    const endDate = new Date(coupon.data_fim || "");
    const currentDate = new Date();
    if (startDate > currentDate) {
      return false;
    }

    if (endDate < currentDate) {
      return false;
    }

    return true;
  }

  public async verifyCouponAvailability(coupon: ICupom) {
    if (coupon.quantidade_uso === null) return true;

    const usedCouponCount = await Prisma.pedido
      .count({
        where: {
          id_cupom: coupon.id_cupom,
        },
      })
      .catch((err) => {
        console.log(err);
        throwError("O-CT-CID");
      });

    return usedCouponCount > coupon.quantidade_uso;
  }

  public async verifyCouponMinRequisits(coupon: ICupom, userId: IUsuario["id_usuario"]) {
    const userOrdersCount = await Prisma.pedido.count({
      where: {
        id_usuario: userId,
      },
    });

    return coupon.qtde_min_pedido <= userOrdersCount;
  }

  public async find() {
    const coupon = (await Prisma.cupom.findUnique({
      where: {
        codigo: this.code,
      },
    })) as ICupom | null;
    return coupon;
  }
}
