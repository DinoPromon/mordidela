import mysql, { serialize } from "database";
import Adicional from "@models/adicional";
import CategoriaAdicional from "@models/categoria_adicional";
import { ViewCategoriaAdicional } from "@models/views";
import { getCategoryIdByProductId } from "@controllers/category";

export async function getAllRelatedAdds() {
  const query =
    "SELECT ca.id_categoria, ca.id_adicional, a.nome, a.preco FROM categoria_adicional ca JOIN categoria c ON c.id_categoria = ca.id_categoria JOIN adicional a ON ca.id_adicional = a.id_adicional ORDER BY id_categoria ASC";
  const result = (await mysql.query(query)) as ViewCategoriaAdicional[];
  await mysql.end();
  return serialize(result);
}

export async function getAddsIdByCategoryId(categoryId: string) {
  const query = "SELECT id_adicional FROM categoria_adicional WHERE id_categoria = ?";
  const result = (await mysql.query(query, [categoryId])) as Pick<CategoriaAdicional, "id_adicional">[];
  await mysql.end();
  return result.length > 0 ? serialize(result) : [];
}

export async function getAddById(addId: string) {
  const query = "SELECT * FROM adicional WHERE id_adicional = ?";
  const result = (await mysql.query(query, [addId])) as Adicional[];
  await mysql.end();
  const serializedResult = serialize(result);
  return result.length > 0 ? serializedResult[0] : null;
}

export async function getAddsByProductId(productId: string) {
  const categoryId = await getCategoryIdByProductId(productId);
  if (!categoryId) throw new Error(`Produto ${productId} não possui categoria.`);
  const addIds = await getAddsIdByCategoryId(categoryId);
  const adds: Adicional[] = [];
  for (let i in addIds) {
    const add = await getAddById(addIds[i].id_adicional);
    add && adds.push(add);
  }
  return adds;
}
