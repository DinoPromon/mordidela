import { throwError } from "@errors/index";
import { AddressRepo } from "@repository/address";

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
      const addresses = (await AddressRepo.findAllByUserId(this.userId)) as IEndereco[];
      return addresses;
    } catch (err) {
      throwError("A-FA");
    }
  }
}
