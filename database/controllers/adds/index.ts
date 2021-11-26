import mysql, { serialize } from "database";
import Adicional from '@models/adicional';
import CategoriaAdicional from "@models/categoria_adicional";
import { getCategoryIdByProductId } from "@controllers/category";

export async function getAddsIdByCategoryId(categoryId: string) {
  const query = "SELECT id_adicional FROM categoria_adicional WHERE id_categoria = ?";
  const result = (await mysql.query(query, [categoryId])) as Pick<CategoriaAdicional, "id_adicional">[];
  return result.length > 0 ? serialize(result) : [];
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
  for (let i in addIds) {
    const add = await getAddById(addIds[i].id_adicional);
    add && adds.push(add);
  }
  return adds;
}