import { Prisma } from "database";

export class AddressRepo {
  public static async findAll() {
    const addresses = await Prisma.endereco.findMany();

    return addresses;
  }
}
