import { Prisma } from "@database";
import ICupom from "@models/cupom";
import IUsuario from "@models/usuario";

export class UserCupomRepo {
  public static async findByUserIdAndCupomId(
    userId: IUsuario["id_usuario"],
    cupomId: ICupom["id_cupom"]
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
