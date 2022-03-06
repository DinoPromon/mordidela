import { Prisma } from "@backend";
import { throwError } from "@errors/index";

import type IUsuario from "@models/usuario";
import type IEndereco from "@models/endereco";

export class FindAllAddressesByUserId {
  private userId: IUsuario["id_usuario"];

  constructor(userId: IUsuario["id_usuario"]) {
    this.userId = userId;
  }

  public async exec() {
    const addresses = await this.findAll();

    return addresses;
  }

  private async findAll() {
    try {
      const addresses = await Prisma.endereco.findMany({
        where: {
          id_usuario: this.userId,
        },
      });
      
      return addresses as IEndereco[];
    } catch (err) {
      throwError("A-FA");
    }
  }
}
