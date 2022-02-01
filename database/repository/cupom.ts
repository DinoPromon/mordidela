import { Prisma } from "@database";
import Cupom from "@models/cupom";

export class CupomRepo {
  public static async create(cupom: Cupom) {
    const createdCupom = await Prisma.cupom.create({
      data: {
        ...cupom,
      },
    });

    return createdCupom;
  }
}
