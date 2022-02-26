import { Prisma } from "database";

import type IUsuario from "@models/usuario";
import type IEndereco from "@models/endereco";

type CreateAddressData = Pick<IEndereco, "bairro" | "complemento" | "logradouro" | "numero"> & {
  id_usuario: IUsuario["id_usuario"];
};

export class AddressRepo {
  public static async findAll() {
    const addresses = await Prisma.endereco.findMany();

    return addresses;
  }

  public static async create(addressData: CreateAddressData) {
    const createdAddress = await Prisma.endereco.create({
      data: {
        ...addressData,
      },
    });

    return createdAddress;
  }
}
