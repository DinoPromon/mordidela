import { Prisma } from "@backend";
import { throwError } from "@errors/index";
import { DateSerializer } from "@helpers/date";

import type IUsuario from "@models/usuario";
import type ITelefone from "@models/telefone";
import type { UserGeneralData } from "@models/usuario";

function convertDateToTimestamp(date: Date | number) {
  if (date instanceof Date) {
    return date.getTime();
  }

  return new Date(date).getTime();
}

type UserInsensitiveData = Omit<IUsuario, "senha" | "autorizacao">;

export class FindUserGeneralData {
  private userId: IUsuario["id_usuario"];

  constructor(userId: IUsuario["id_usuario"]) {
    this.userId = userId;
  }

  public async exec() {
    const userInsensitiveData = await this.findUserInsensitiveData();

    // usuário não encontrado
    if (!userInsensitiveData) throwError("O-C-DI");

    const userPhone = (await this.findUserPhone()) as ITelefone;
    const userOrdersCount = await this.countUserOrders();

    const userGeneralData: UserGeneralData = {
      ...userInsensitiveData,
      telefone: userPhone,
      count_pedido: userOrdersCount,
    };

    return userGeneralData;
  }

  private async findUserPhone() {
    const userPhone = await Prisma.telefone
      .findFirst({
        where: {
          id_usuario: this.userId,
        },
      })
      .catch((err) => {
        console.log(err);
        throwError("O-C-DI");
      });

    return userPhone as ITelefone | null;
  }

  private async countUserOrders() {
    const userOrdersCount = await Prisma.pedido
      .count({
        where: {
          id_usuario: this.userId,
        },
      })
      .catch((err) => {
        console.log(err);
        throwError("O-C-DI");
      });

    return userOrdersCount;
  }

  private async findUserInsensitiveData() {
    const userInsensitiveData = await Prisma.usuario
      .findUnique({
        where: {
          id_usuario: this.userId,
        },
        select: {
          id_usuario: true,
          nome: true,
          data_nascimento: true,
          email: true,
          data_criacao: true,
        },
      })
      .catch((err) => {
        console.log(err);
        throwError("O-C-DI");
      });

    if (userInsensitiveData === null) return null;

    return {
      ...userInsensitiveData,
      data_criacao: DateSerializer.serialize(userInsensitiveData.data_criacao),
      data_nascimento: DateSerializer.serialize(userInsensitiveData.data_nascimento),
    } as UserInsensitiveData;
  }
}
