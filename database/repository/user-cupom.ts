import { Prisma } from "@database";
import type ICupom from "@models/cupom";
import type IUsuario from "@models/usuario";
import type IUsuarioCupom from "@models/usuario_cupom";
import { createDate } from "@utils/transformation/date";

export class UserCupomRepo {
  public static async findManyByUserIdAndCouponId(
    userId: IUsuario["id_usuario"],
    cupomId: ICupom["id_cupom"]
  ) {
    const userCupom = await Prisma.usuario_cupom.findMany({
      where: {
        id_cupom: cupomId,
        id_usuario: userId,
      },
    });

    return userCupom;
  }

  public static async create(
    userCouponData: Omit<IUsuarioCupom, "id_usuario_cupom" | "data_obtencao">
  ) {
    const createdUserCoupon = await Prisma.usuario_cupom.create({
      data: {
        ...userCouponData,
        data_uso: userCouponData.data_uso ? createDate(userCouponData.data_uso) : null,
      },
    });

    return createdUserCoupon;
  }
}
