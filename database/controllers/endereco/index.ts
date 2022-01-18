import Endereco from "@models/endereco";
import Usuario from "@models/usuario";
import mysql, { serialize } from "database";

export async function getDeliveryIdByUserId(id: Usuario["id_usuario"]) {
  const query = "SELECT id_entrega FROM endereco WHERE id_usuario = ?";
  const result = await mysql.query<Pick<Endereco, "id_entrega">[]>(query, [id]);

  return result[0].id_entrega;
}

export async function getAllAddressByUserId(id: Usuario["id_usuario"]) {
  const query = "SELECT * FROM endereco WHERE id_usuario = ?";
  const result = await mysql.query<Endereco[]>(query, [id]);

  return serialize(result);
}
