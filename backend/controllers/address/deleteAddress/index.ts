import { Prisma } from "@backend";
import { throwError } from "@errors/index";

import type IUsuario from "@models/usuario";
import type IEndereco from "@models/endereco";

type DeleteAddressArg = {
  id_endereco: IEndereco["id_endereco"];
  id_usuario: IUsuario["id_usuario"];
};

export class DeleteAddress {
  private deleteAddressArg: DeleteAddressArg;

  constructor(deleteAddressArg: DeleteAddressArg) {
    this.deleteAddressArg = deleteAddressArg;
  }

  public async exec() {
    const userHasPermission = await this.checkPermission();
    if (!userHasPermission) throwError("O-C-DI", { customMessage: "Usuário não autorizado" });

    const deletedAddress = await this.deleteAddress();

    return deletedAddress;
  }

  private async checkPermission() {
    const userOwnAddress = Boolean(
      await Prisma.endereco
        .findFirst({
          where: {
            id_endereco: this.deleteAddressArg.id_endereco,
            id_usuario: this.deleteAddressArg.id_usuario,
          },
        })
        .catch((err) => {
          console.log(err);
          throwError("O-C-DI", { customMessage: "Erro ao validar permissão." });
        })
    );

    return userOwnAddress;
  }

  private async deleteAddress() {
    const deletedAddress = await Prisma.endereco
      .update({
        where: {
          id_endereco: this.deleteAddressArg.id_endereco,
        },
        data: {
          deletado: true,
        },
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Erro deletar endereço" });
      });

    return deletedAddress as IEndereco;
  }
}
