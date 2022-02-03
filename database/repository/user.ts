import { Prisma } from "@database";
import Usuario, { UserWithoutPassword } from "@models/usuario";

export class UserRepo {
  public static async findByUserId(userId: Usuario["id_usuario"]) {
    const user = await Prisma.usuario.findUnique({
      where: {
        id_usuario: userId,
      },
    });

    return user as Usuario | null;
  }

  public static async findWithoutPasswordByUserId(userId: Usuario["id_usuario"]) {
    const userWithoutPassword = await Prisma.usuario.findUnique({
      where: {
        id_usuario: userId,
      },
      select: {
        id_usuario: true,
        nome: true,
        data_nascimento: true,
        email: true,
        autorizacao: true,
        data_criacao: true,
      },
    });

    return userWithoutPassword as UserWithoutPassword | null;
  }
}
