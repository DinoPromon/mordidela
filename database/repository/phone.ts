import { Prisma } from "@database";
import Usuario from "@models/usuario";

export class PhoneRepo {
  public static async findByUserId(userId: Usuario["id_usuario"]) {
    const phone = await Prisma.telefone.findFirst({
      where: {
        id_usuario: userId,
      },
    });

    return phone;
  }
}
