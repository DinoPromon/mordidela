import UsuarioCupom from "@models/usuario_cupom";
import { Prisma } from "@database";
import { usuario_cupom, pedido, cupom } from "@prisma/client";

type UsuarioCupomRelacionado = usuario_cupom & {
  cupom: cupom;
  pedido: pedido | null;
};

export async function findCupomRelationsById(userId: UsuarioCupom["id_cupom"]) {
  const relatedCupom: UsuarioCupomRelacionado[] = await Prisma.usuario_cupom.findMany({
    where: {
      id_usuario: userId,
    },
    include: {
      cupom: true,
      pedido: true,
    },
  });

  return relatedCupom;
}
