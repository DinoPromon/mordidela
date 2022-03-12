import { Prisma } from "@backend";
import { throwError } from "@errors/index";

import { InputParser } from "@helpers/input";

import { CreateAddressValidator } from "./validator";

import type IUsuario from "@models/usuario";
import type IEndereco from "@models/endereco";

export type CreateAddressData = {
  logradouro: string;
  numero: string;
  bairro: string;
  complemento?: string;
};

interface ICreateAddressProps extends CreateAddressData {
  userId: IUsuario["id_usuario"];
}

export class CreateAddress extends InputParser {
  private validator: CreateAddressValidator;
  private addressData: CreateAddressData;
  private userId: IUsuario["id_usuario"];

  constructor(addressData: ICreateAddressProps) {
    super();
    this.validator = new CreateAddressValidator(this.parse(addressData));
    this.userId = addressData.userId;
    this.addressData = {
      bairro: addressData.bairro,
      numero: addressData.numero,
      logradouro: addressData.logradouro,
      complemento: addressData.complemento,
    };
  }

  public async exec() {
    this.validator.validate();
    const createdAddress = await this.create();

    return createdAddress;
  }

  private async create() {
    try {
      const createdAddress = await Prisma.endereco.create({
        data: {
          numero: this.addressData.numero,
          logradouro: this.addressData.logradouro,
          complemento: this.addressData.complemento ? this.addressData.complemento : null,
          bairro: this.addressData.bairro,
          id_usuario: this.userId,
          deletado: false,
        },
      });
      return createdAddress as IEndereco;
    } catch (error) {
      console.log(error);
      throwError("A-C");
    }
  }
}
