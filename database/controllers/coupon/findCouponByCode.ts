import { OrderRepo } from "@repository/order";
import { CupomRepo } from "@repository/cupom";
import { UserCouponRepo } from "@repository/user-cupom";

import type ICupom from "@models/cupom";
import type IUsuario from "@models/usuario";
import type IUsuarioCupom from "@models/usuario_cupom";

export class FindCouponByCode {
  private code: ICupom["codigo"];

  constructor(couponCode: ICupom["codigo"]) {
    this.code = couponCode;
  }

  public async verifyCouponUsability(coupon: ICupom, userID: IUsuario["id_usuario"]) {
    const userCouponsList = (await UserCouponRepo.findManyByUserIdAndCouponId(
      userID,
      coupon.id_cupom
    )) as IUsuarioCupom[];

    if (coupon.fidelidade) {
      const hasUnusedCoupon = Boolean(
        userCouponsList.find((userCoupon) => userCoupon.foi_usado === false)
      );
      return hasUnusedCoupon;
    }

    const isCouponUsed = Boolean(
      userCouponsList.find((userCoupon) => userCoupon.foi_usado === true)
    );

    return isCouponUsed ? false : true;
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
    if (!coupon.quantidade_uso) return true;

    const usedCouponCount = await OrderRepo.countByCupomId(coupon.id_cupom);

    return usedCouponCount > coupon.quantidade_uso;
  }

  public async verifyCouponMinRequisits(coupon: ICupom, userId: IUsuario["id_usuario"]) {
    const userOrdersCount = await OrderRepo.countByUserId(userId);

    return coupon.qtde_min_pedido <= userOrdersCount;
  }

  public async find() {
    const coupon = (await CupomRepo.findByCupomCode(this.code)) as ICupom | null;
    return coupon;
  }
}
