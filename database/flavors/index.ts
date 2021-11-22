import mysql, { serialize } from "database";
import { ProdutoSabor } from "@my-types/database/models/produto_sabor";
import { Sabor } from "@my-types/database/models/sabor";

export async function getFlavorById(flavorId: string) {
  const query = "SELECT * FROM sabor WHERE id_sabor = ?";
  const result = (await mysql.query(query, [flavorId])) as Sabor[];
  const serializedResult = serialize(result);
  return result.length > 0 ? serializedResult[0] : null;
}

export async function getFlavosrByProductId(productId: string) {
  const query = "SELECT id_sabor FROM produto_sabor WHERE id_produto = ?";
  const productFlavorsId = (await mysql.query(query, [productId])) as Pick<ProdutoSabor, "id_sabor">[];
  if (productFlavorsId.length > 0) {
    const flavors: Sabor[] = [];
    for (const flavorId in productFlavorsId) {
      const flavor = await getFlavorById(flavorId);
      flavor !== null && flavors.push(flavor);
    }
    return flavors;
  }

  return [];
}
