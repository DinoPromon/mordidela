import { Prisma } from "database";
import Usuario from "@models/usuario";
import Cupom from "@models/cupom";

export async function findOrdersCountByUserId(userId: Usuario["id_usuario"]) {
  const count = await Prisma.pedido.count({
    where: {
      id_usuario: userId,
    },
  });

  return count;
}

export async function findCountOrdersWithCupomId(cupomId: Cupom["id_cupom"]) {
  const usedAmountCupom = await Prisma.pedido.count({
    where: {
      id_cupom: cupomId,
    },
  });

  return usedAmountCupom;
}
