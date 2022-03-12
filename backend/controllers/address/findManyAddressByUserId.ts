import { Prisma } from "backend";

import type IUsuario from "@models/usuario";

export async function findManyAddressByUserId(userId: IUsuario["id_usuario"]) {
  const addresses = await Prisma.endereco.findMany({
    include: {
      entrega: {
        select: {
          preco_entrega: true,
        },
      },
    },
    where: {
      id_usuario: userId,
      deletado: false,
    },
  });

  return addresses;
}
