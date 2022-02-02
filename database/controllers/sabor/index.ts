import mysql, { serialize } from "database";
import Sabor from "@models/sabor";
import ProdutoSabor from "@models/produto_sabor";
import { ViewProdutoSabor } from "@models/views";

export async function getSaborById(flavorId: string) {
  const query = "SELECT * FROM sabor WHERE id_sabor = ?";
  const result = (await mysql.query(query, [flavorId])) as Sabor[];
  await mysql.end();
  const serializedResult = serialize(result);
  return result.length > 0 ? serializedResult[0] : null;
}

export async function getSaboresByIdProduto(productId: string) {
  const query = "SELECT id_sabor FROM produto_sabor WHERE id_produto = ?";
  const productFlavorsId = (await mysql.query(query, [productId])) as Pick<
    ProdutoSabor,
    "id_sabor"
  >[];
  await mysql.end();
  if (productFlavorsId.length > 0) {
    const flavors: Sabor[] = [];
    for (const flavorId in productFlavorsId) {
      const flavor = await getSaborById(flavorId);
      flavor !== null && flavors.push(flavor);
    }
    return flavors;
  }
  return [];
}
