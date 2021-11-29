import Cupom from "@models/cupom";
import Usuario from "@models/usuario";
import UsuarioCupom from "@models/usuario_cupom";
import mysql, { serialize } from "database";

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

export async function canUsuarioUseCupom(id_usuario: Usuario["id_usuario"], codigo: Cupom["codigo"]) {
  const cupom = await getCupomByCodigo(codigo);
  if (cupom) {
    const query = "SELECT foi_usado FROM usuario_cupom WHERE id_usuario = ? AND id_cupom = ? ORDER BY foi_usado ASC";
    const result = (await mysql.query(query, [id_usuario, cupom.id_cupom])) as Pick<
      UsuarioCupom,
      "foi_usado"
    >[];

    if (!result.length) {
      return !cupom.qtde_min_pedido ? cupom : undefined;
    }

    console.log(cupom);
    if (result[0].foi_usado || !isCupomAvailable(cupom.data_inicio, cupom.data_fim)) return;
    return cupom;
  }

  return;
}
