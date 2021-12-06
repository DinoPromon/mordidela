import Categoria from '@models/categoria';
import mysql, { serialize } from "database";

export async function getIdCategoriaByIdProduto(productId: string) {
  const query = "SELECT id_categoria FROM produto WHERE id_produto = ?";
  const result = (await mysql.query(query, [productId])) as Pick<Categoria, "id_categoria">[];
  await mysql.end();
  const serializedResult = serialize(result);
  return result.length > 0 ? serializedResult[0].id_categoria : null;
}

export async function getCategoriaById(categoryId: string) {
  const query = "SELECT * from categoria WHERE id_categoria = ?";
  const result = (await mysql.query(query, [categoryId])) as Categoria[];
  const serializedResult = serialize(result);
  return result.length > 0 ? serializedResult[0] : null;
}
