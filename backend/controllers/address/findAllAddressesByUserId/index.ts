import { Prisma } from "@backend";
import { throwError } from "@errors/index";

import type IUsuario from "@models/usuario";
import type IEndereco from "@models/endereco";

type FindAllAddressesArg = {
  getDeleted?: boolean;
  id_usuario: IUsuario["id_usuario"];
};

export class FindAllAddressesByUserId {
  private findAllAddressesArg: FindAllAddressesArg;

  constructor(findAllAddressesArg: FindAllAddressesArg) {
    this.findAllAddressesArg = findAllAddressesArg;
  }

  public async exec() {
    const addresses = await this.findAll();

    return addresses;
  }

  private async findAll() {
    try {
      const addresses = await Prisma.endereco.findMany({
        where: {
          id_usuario: this.findAllAddressesArg.id_usuario,
          deletado: this.findAllAddressesArg.getDeleted ? undefined : false,
        },
      });

      return addresses as IEndereco[];
    } catch (err) {
      console.log(err);
      throwError("A-FA");
    }
  }
}
