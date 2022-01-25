import mysql, { serialize } from "database";

import Produto from "@models/produto";

async function getNomeProdutoById(productId: string) {
  const query = "SELECT nome FROM produto WHERE id_produto=?";
  const result = (await mysql.query(query, [productId])) as Pick<Produto, "nome">[];
  await mysql.end();
  const serializedResult = serialize(result);
  return result.length > 0 ? serializedResult[0].nome : null;
}

async function getProdutoTamanhoByNome(productName: string) {
  const query = "SELECT id_produto, preco_padrao, tamanho FROM produto WHERE nome=?";
  const result = (await mysql.query(query, [productName])) as Pick<
    Produto,
    "id_produto" | "preco_padrao" | "tamanho"
  >[];
  await mysql.end();
  const serializedResult = serialize(result);
  return result.length > 0 ? serializedResult : [];
}

export async function getImagemProdutoById(productId: string) {
  const query = "SELECT imagem FROM produto WHERE id_produto=?";
  const result = (await mysql.query(query, [productId])) as Pick<Produto, "imagem">[];
  await mysql.end();
  const serializedResult = serialize(result);
  return result.length > 0 ? serializedResult[0] : null;
}

export async function getTamanhoProdutoById(productId: string) {
  const name = await getNomeProdutoById(productId);
  if (!name) throw new Error("Produto não existente.");
  const sizes = await getProdutoTamanhoByNome(name);
  return sizes;
}

export async function getProdutoById(productId: string) {
  const query =
    "SELECT id_produto, nome, descricao, qtde_max_sabor, preco_padrao, disponivel, tamanho FROM produto WHERE id_produto = ?";
  const result = (await mysql.query(query, [productId])) as Omit<Produto, "imagem">[];
  await mysql.end();
  if (!result.length) throw new Error("Produto não existente.");
  return result[0];
}
