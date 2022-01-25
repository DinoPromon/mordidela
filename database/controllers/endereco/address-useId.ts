import Endereco from "@models/endereco";
import Usuario from "@models/usuario";
import { Prisma } from "database";

export async function findManyAddressByUserId(userId: Usuario["id_usuario"]) {
  const addresses = await Prisma.endereco.findMany({
    where: {
      id_usuario: userId,
    },
  });

  return addresses as Endereco[];
}
