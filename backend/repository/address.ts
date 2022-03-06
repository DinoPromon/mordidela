import { Prisma } from "backend";

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

  public static async findAllByUserId(userId: IUsuario["id_usuario"]) {
    const addresses = await Prisma.endereco.findMany({
      where: {
        id_usuario: userId,
      },
    });

    return addresses;
  }

  public static async findAllRelationsByUserId(userId: IUsuario["id_usuario"]) {
    const relatedAddresses = await Prisma.endereco.findMany({
      include: {
        entrega: true,
      },
      where: {
        id_usuario: userId,
      },
    });

    return relatedAddresses;
  }
}
