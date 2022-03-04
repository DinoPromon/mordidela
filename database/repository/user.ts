import { Prisma } from "@database";
import IUsuario, { UserWithoutPassword } from "@models/usuario";
import { usuario } from "@prisma/client";

type FindUseCases = Partial<IUsuario>;

export class UserRepo {
  public static async findByUserId(userId: IUsuario["id_usuario"]) {
    const user = await Prisma.usuario.findUnique({
      where: {
        id_usuario: userId,
      },
    });

    return user as IUsuario | null;
  }

  public static async findWithoutPasswordByUserId(userId: IUsuario["id_usuario"]) {
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

  public static async updateByUserId(
    userId: IUsuario["id_usuario"],
    newUserData: Partial<usuario>
  ) {
    const updatedUserData = await Prisma.usuario.update({
      data: {
        ...newUserData,
      },
      where: {
        id_usuario: userId,
      },
    });

    return updatedUserData;
  }
}
