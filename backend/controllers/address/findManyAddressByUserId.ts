import IUsuario from "@models/usuario";
import { Prisma } from "backend";

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
    },
  });

  return addresses;
}
