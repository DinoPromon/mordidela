import mysql, { serialize } from "database";
import ISabor from "@models/sabor";
import IProdutoSabor from "@models/produto_sabor";

export async function getSaborById(flavorId: string) {
  const query = "SELECT * FROM sabor WHERE id_sabor = ?";
  const result = (await mysql.query(query, [flavorId])) as ISabor[];
  await mysql.end();
  const serializedResult = serialize(result);
  return result.length > 0 ? serializedResult[0] : null;
}

export async function getSaboresByIdProduto(productId: string) {
  const query = "SELECT id_sabor FROM produto_sabor WHERE id_produto = ?";
  const productFlavorsId = (await mysql.query(query, [productId])) as Pick<
    IProdutoSabor,
    "id_sabor"
  >[];
  await mysql.end();
  if (productFlavorsId.length > 0) {
    const flavors: ISabor[] = [];
    for (const flavorId in productFlavorsId) {
      const flavor = await getSaborById(flavorId);
      flavor !== null && flavors.push(flavor);
    }
    return flavors;
  }
  return [];
}
