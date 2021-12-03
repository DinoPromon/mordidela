import mysql, { serialize } from "database";
import Usuario from "@models/usuario";
// import { getDeliveryIdByUserId } from "@controllers/address";
import Entrega from "@models/entrega";

export async function getDeliveryPriceByUserId(id: Usuario["id_usuario"]) {
  const query = "SELECT preco_entrega FROM entrega WHERE id_entrega = (SELECT id_entrega FROM endereco WHERE id_usuario = ?)";

  const result = (await mysql.query(query, [id])) as Pick<Entrega, "preco_entrega">[];
  return result[0].preco_entrega;
}
