import { Prisma } from "@database";
import Cupom from "@models/cupom";
import Usuario from "@models/usuario";

export class UserCupomRepo {
  public static async findByUserIdAndCupomId(
    userId: Usuario["id_usuario"],
    cupomId: Cupom["id_cupom"]
  ) {
    const userCupom = await Prisma.usuario_cupom.findFirst({
      where: {
        id_cupom: cupomId,
        id_usuario: userId,
        foi_usado: false,
      },
    });

    return userCupom;
  }
}
