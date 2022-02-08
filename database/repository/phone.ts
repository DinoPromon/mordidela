import { Prisma } from "@database";
import Usuario from "@models/usuario";
import { telefone } from "@prisma/client";

export class PhoneRepo {
  public static async findByUserId(userId: Usuario["id_usuario"]) {
    const phone = await Prisma.telefone.findFirst({
      where: {
        id_usuario: userId,
      },
    });

    return phone;
  }

  public static async updateByUserId(
    userId: Usuario["id_usuario"],
    newPhoneData: Partial<telefone>
  ) {
    const phone = await this.findByUserId(userId);

    const updatedPhone = await Prisma.telefone.update({
      data: {
        ...newPhoneData,
      },
      where: {
        id_telefone: phone?.id_telefone,
      },
    });

    return updatedPhone;
  }
}
