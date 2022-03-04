import { Prisma } from "@database";

import type { telefone } from "@prisma/client";
import type ITelefone from "@models/telefone";
import type IUsuario from "@models/usuario";

type FindByUseCases = Partial<ITelefone>;

export class PhoneRepo {
  public static async findByUserId(userId: IUsuario["id_usuario"]) {
    const phone = await Prisma.telefone.findFirst({
      where: {
        id_usuario: userId,
      },
    });

    return phone;
  }

  public static async findByUseCase(cases: FindByUseCases) {
    const phone = await Prisma.telefone.findFirst({
      where: {
        ...cases,
      },
    });

    return phone;
  }

  public static async updateByUserId(
    userId: IUsuario["id_usuario"],
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
