import { Prisma } from "database";
import Cupom from "@models/cupom";

export class CupomRepo {
  public static async findByCupomId(cupomId: Cupom["id_cupom"]) {
    const cupom = await Prisma.cupom.findUnique({
      where: {
        id_cupom: cupomId,
      },
    });

    return cupom;
  }

  public static async findByCupomCode(cupomCode: Cupom["codigo"]) {
    const cupom = await Prisma.cupom.findUnique({
      where: {
        codigo: cupomCode,
      },
    });

    return cupom;
  }

  public static isCupomAvailable(startDate: Cupom["data_inicio"], endDate: Cupom["data_fim"]) {
    const currentTimestamp = new Date().getTime();
    const startTimestmap = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate || "").getTime();

    if (currentTimestamp >= endTimestamp || currentTimestamp < startTimestmap) {
      return false;
    }
    return true;
  }
}
