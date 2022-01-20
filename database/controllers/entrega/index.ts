import mysql from "database";
import Entrega from "@models/entrega";
import Endereco from "@models/endereco";

export async function getDeliveryPriceByAddressId(id: Endereco["id_endereco"]) {
  const query =
    "SELECT preco_entrega FROM entrega WHERE id_entrega = (SELECT id_entrega FROM endereco WHERE id_endereco = ?)";

  const result = (await mysql.query(query, [id])) as Pick<Entrega, "preco_entrega">[];
  return result[0].preco_entrega;
}
