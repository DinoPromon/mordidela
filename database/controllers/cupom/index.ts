import { Prisma } from "database";
import Cupom from "@models/cupom";
import Usuario from "@models/usuario";
import UsuarioCupom from "@models/usuario_cupom";
import mysql, { serialize } from "database";

export async function findCupomById(cupomId: Cupom["id_cupom"]) {
  const cupom = await Prisma.cupom.findUnique({
    where: {
      id_cupom: cupomId,
    },
  });

  return cupom;
}

export async function findCupomByCode(cupomCode: Cupom["codigo"]) {
  const cupom = await Prisma.cupom.findUnique({
    where: {
      codigo: cupomCode,
    },
  });

  return cupom;
}

function isCupomAvailable(data_inicio: Cupom["data_inicio"], data_fim: Cupom["data_fim"]) {
  const currentTimestamp = new Date().getTime();
  const inicioTimestamp = new Date(data_inicio).getTime();
  const fimTimestamp = new Date(data_fim || "").getTime();
  if (currentTimestamp >= fimTimestamp || currentTimestamp < inicioTimestamp) {
    return false;
  }
  return true;
}

export async function getCupomById(id?: Cupom["id_cupom"]) {
  if (!id) return;
  const query = "SELECT * FROM cupom WHERE id_cupom = ?";
  const result = (await mysql.query(query, [id])) as Cupom[];
  return serialize(result)[0];
}

export async function getCupomByCodigo(codigo: Cupom["codigo"]) {
  const query = "SELECT * FROM cupom WHERE codigo = ?";
  const result = (await mysql.query(query, [codigo])) as Cupom[];
  return serialize(result)[0];
}
