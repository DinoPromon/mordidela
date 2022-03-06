import { Prisma } from "@backend";

import { throwError } from "@errors/index";
import { InputSerializer } from "@helpers/input";

import { UpdateGeneralDataValidator } from "./validator";

import type IUsuario from "@models/usuario";
import type ITelefone from "@models/telefone";

export type GeneralData = {
  ddd: string;
  numero: string;
  nome: string;
  data_nascimento: string | Date;
};

export class UpdateGeneralData extends InputSerializer {
  private generalData: Partial<GeneralData>;
  private userId: IUsuario["id_usuario"];
  private validator: UpdateGeneralDataValidator;

  constructor(userId: IUsuario["id_usuario"], generalData: Partial<GeneralData>) {
    super();
    const serializedGeneralData = this.serialize(generalData);
    this.validator = new UpdateGeneralDataValidator(serializedGeneralData);
    this.userId = userId;
    this.generalData = this.serialize(serializedGeneralData);
  }

  public async exec() {
    this.validator.validate();
    const userPhone = await this.findUserPhone();

    const updatedUser = await this.updateUser();

    if (!userPhone) throwError("O-C-DI");

    const updatedPhone = await this.updatePhone(userPhone.id_telefone);

    return {
      usuario: updatedUser,
      telefone: updatedPhone,
    };
  }

  private async findUserPhone() {
    const phone = await Prisma.telefone
      .findFirst({
        where: {
          id_usuario: this.userId,
        },
      })
      .catch((err) => {
        console.log(err);
        throwError("O-C-DI");
      });

    return phone as ITelefone | null;
  }

  private async updateUser() {
    const updatedUser = await Prisma.usuario
      .update({
        data: {
          nome: this.generalData.nome,
          data_nascimento: this.generalData.data_nascimento,
        },
        select: {
          nome: true,
          data_nascimento: true,
        },
        where: {
          id_usuario: this.userId,
        },
      })
      .catch((err) => {
        console.log(err);
        throwError("O-C-DI");
      });

    return updatedUser as Pick<IUsuario, "nome" | "data_nascimento">;
  }

  private async updatePhone(phoneId: ITelefone["id_telefone"]) {
    const updatedPhone = await Prisma.telefone
      .update({
        data: {
          ddd: this.generalData.ddd,
          numero: this.generalData.numero,
        },
        select: {
          ddd: true,
          numero: true,
        },
        where: {
          id_telefone: phoneId,
        },
      })
      .catch((err) => {
        console.log(err);
        throwError("O-C-DI");
      });

    return updatedPhone as Pick<ITelefone, "ddd" | "numero">;
  }
}
