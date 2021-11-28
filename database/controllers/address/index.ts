import Endereco from "@models/endereco";
import Usuario from "@models/usuario";
import mysql from "database";

export async function getDeliveryIdByUserId(id: Usuario["id_usuario"]) {
  const query = "SELECT id_entrega FROM endereco WHERE id_usuario = ?";
  const result = (await mysql.query(query, [id])) as Pick<Endereco, 'id_entrega'>[];

  return result[0].id_entrega;
}
