import mysql, { serialize } from "database";

import { Produto } from "@my-types/database/models/produto";
import { Product } from "@my-types/product";

export async function getAllProducts() {
  const query = "SELECT id_produto, nome, id_categoria, id_desconto, disponivel FROM produto";
  const result = (await mysql.query(query)) as Product[];
  return serialize(result);
}

export async function getProductImageById(productId: string) {
  const query = "SELECT imagem FROM produto WHERE id_produto=?";
  const result = (await mysql.query(query, [productId])) as Pick<Produto, "imagem">[];
  const serializedResult = serialize(result);
  return result.length > 0 ? serializedResult[0] : null;
}

export async function getProductNameById(productId: string) {
  const query = "SELECT nome FROM produto WHERE id_produto=?";
  const result = (await mysql.query(query, [productId])) as Pick<Produto, "nome">[];
  const serializedResult = serialize(result);
  return result.length > 0 ? serializedResult[0].nome : null;
}

export async function getProductSizesByName(productName: string) {
  const query = "SELECT id_produto, preco_padrao, tamanho FROM produto WHERE nome=?";
  const result = (await mysql.query(query, [productName])) as Pick<
    Produto,
    "id_produto" | "preco_padrao" | "tamanho"
  >[];
  const serializedResult = serialize(result);
  return result.length > 0 ? serializedResult : [];
}

export async function getProductSizesById(productId: string) {
  const name = await getProductNameById(productId);
  if (!name) throw new Error("Produto não existente.");
  const sizes = await getProductSizesByName(name);
  return sizes;
}

export async function getProductById(productId: string) {
  const query = "SELECT nome, descricao, qtde_max_sabor FROM produto WHERE id_produto = ?";
  const result = (await mysql.query(query, [productId])) as Pick<
    Produto,
    "nome" | "descricao" | "qtde_max_sabor"
  >[];
  if (!result.length) throw new Error("Produto não existente.");
  return result[0];
}
