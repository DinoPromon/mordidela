import mysql from "database";

import { Product } from "@my-types/product";

export async function getAllProducts() {
  const query = "SELECT id_produto, nome, id_categoria, id_desconto, disponivel FROM produto";
  const result = (await mysql.query(query)) as any[]
  const products: Product[] = [];
  for (let i in result) {
    products.push({ ...result[i] } as Product);
  }
  return products;
}

export async function getProductImageById(productId: string) {
  const query = "SELECT imagem FROM produto WHERE id_produto = ?";
  const result = (await mysql.query(query, [productId])) as any;
  return result[0];
}