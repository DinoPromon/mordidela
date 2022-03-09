import { Prisma } from "@backend";
import { throwError } from "@errors/index";
import { InputParser } from "@helpers/input";

import type IEndereco from "@models/endereco";
import IUsuario from "@models/usuario";
import { UpdateAddressValidator } from "./validator";

export type UpdateAddressArg = Partial<
  Omit<IEndereco, "id_endereco" | "id_usuario" | "id_entrega">
> &
  Pick<IEndereco, "id_endereco">;

export class UpdateAddress extends InputParser {
  private updateAddressArg: UpdateAddressArg;
  private userId: IUsuario["id_usuario"];
  private validator: UpdateAddressValidator;

  constructor(userId: IUsuario["id_usuario"], updateAddressArg: UpdateAddressArg) {
    super();
    const parsedUpdateAddressArg = this.parse(updateAddressArg);

    this.userId = userId;
    this.updateAddressArg = parsedUpdateAddressArg;
    this.validator = new UpdateAddressValidator(parsedUpdateAddressArg);
  }

  public async exec() {
    this.validator.validate();

    await this.checkPermissionToUpdate();

    const updatedAddress = await this.updateAddress();

    return updatedAddress;
  }

  private async updateAddress() {
    const updatedAddress = await Prisma.endereco
      .update({
        data: {
          bairro: this.updateAddressArg.bairro,
          complemento: this.updateAddressArg.complemento,
          logradouro: this.updateAddressArg.logradouro,
          numero: this.updateAddressArg.numero,
        },
        where: {
          id_endereco: this.updateAddressArg.id_endereco,
        },
      })
      .catch((err) => {
        console.log(err);
        throwError("O-C-DI");
      });

    return updatedAddress as IEndereco;
  }

  private async checkPermissionToUpdate() {
    const addressToUpdate = await Prisma.endereco
      .findFirst({
        where: {
          id_usuario: this.userId,
          id_endereco: this.updateAddressArg.id_endereco,
        },
      })
      .catch((err) => {
        console.log(err);
        throwError("O-C-DI");
      });

    if (!addressToUpdate) throwError("O-C-DI", { customMessage: "Usuário não autorizaco" });
  }
}
