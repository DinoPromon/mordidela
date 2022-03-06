import { Prisma } from "@backend";
import ICupom from "@models/cupom";

export class CupomRepo {
  public static async findByCupomId(cupomId: ICupom["id_cupom"]) {
    const cupom = await Prisma.cupom.findUnique({
      where: {
        id_cupom: cupomId,
      },
    });

    return cupom;
  }

  public static async findByCupomCode(cupomCode: ICupom["codigo"]) {
    const cupom = await Prisma.cupom.findUnique({
      where: {
        codigo: cupomCode,
      },
    });

    return cupom;
  }

  public static async create(cupom: Omit<ICupom, "id_cupom" | "data_criacao">) {
    const ISOstartDate = cupom.data_inicio ? new Date(cupom.data_inicio).toISOString() : null;
    const ISOendDate = cupom.data_fim ? new Date(cupom.data_fim).toISOString() : null;
    const createdCupom = await Prisma.cupom.create({
      data: {
        ...cupom,
        data_fim: ISOendDate,
        data_inicio: ISOstartDate,
      },
    });

    return createdCupom;
  }

  public static async findAllFidelityCoupons() {
    const fidelityCoupons = await Prisma.cupom.findMany({
      where: {
        fidelidade: true,
      },
      orderBy: {
        qtde_min_pedido: "desc",
      },
    });

    return fidelityCoupons;
  }

  // public static isCupomAvailable(startDate: ICupom["data_inicio"], endDate: ICupom["data_fim"]) {
  //   const currentTimestamp = new Date().getTime();
  //   const startTimestmap = startDate ? new Date(startDate).getTime() : new Date().getTime();
  //   const endTimestamp = endDate ? new Date(endDate).getTime() : new Date().getTime();

  //   if (currentTimestamp >= endTimestamp || currentTimestamp < startTimestmap) {
  //     return false;
  //   }
  //   return true;
  // }
}
