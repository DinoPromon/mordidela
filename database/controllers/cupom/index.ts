import Cupom from "@models/cupom";
import mysql, { serialize } from "database";

export async function getCupomById(id?: Cupom["id_cupom"]) {
  if (!id) return;
  const query = "SELECT * FROM cupom WHERE id_cupom = ?";
  const result = (await mysql.query(query, [id])) as Cupom[];
  return serialize(result)[0];
}
