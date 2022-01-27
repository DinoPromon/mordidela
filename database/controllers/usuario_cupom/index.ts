import { Prisma } from "database";
import Cupom from "@models/cupom";

export async function findUserCupomByCupomId(cupomId: Cupom["id_cupom"]) {
  const userCupom = await Prisma.usuario_cupom.findFirst({
    where: {
      id_cupom: cupomId,
      foi_usado: true,
    },
  });

  return userCupom;
}
