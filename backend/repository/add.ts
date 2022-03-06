import { Prisma } from "backend";

export class AddRepo {
  public static async findAll() {
    const add = await Prisma.adicional.findMany();

    return add;
  }
}
