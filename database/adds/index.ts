import mysql, { serialize } from "database";
import { Adicional } from "@my-types/database/models/adicional";
import { getCategoryIdByProductId } from "database/category";
import { CategoriaAdicional } from "@my-types/database/models/categoria_adicional";

export async function getAddsIdByCategoryId(categoryId: string) {
  const query = "SELECT id_adicional FROM categoria_adicional WHERE id_categoria = ?";
  const result = (await mysql.query(query, [categoryId])) as Pick<CategoriaAdicional, "id_adicional">[];
  if (result.length > 0) {
    const serializedResult = serialize(result);
    const ids: CategoriaAdicional["id_adicional"][] = [];
    for (let i in serializedResult) {
      ids.push(serializedResult[i].id_adicional);
    }
    return ids;
  }
  return [];
}

export async function getAddById(addId: string) {
  const query = "SELECT * FROM adicional WHERE id_adicional = ?";
  const result = (await mysql.query(query, [addId])) as Adicional[];
  const serializedResult = serialize(result);
  return result.length > 0 ? serializedResult[0] : null;
}

export async function getAddsByProductId(productId: string) {
  const categoryId = await getCategoryIdByProductId(productId);
  if (!categoryId) throw new Error(`Produto ${productId} não possui categoria.`);
  const addIds = await getAddsIdByCategoryId(categoryId);
  const adds: Adicional[] = [];
  for (let addId in addIds) {
    const add = await getAddById(addId);
    add && adds.push(add);
  }
  return adds;
}
