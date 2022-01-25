import { Prisma } from "database";
import { RelatedProduct } from "@models/produto";

export async function findManyRelatedProducts() {
  const products = await Prisma.produto.findMany({
    select: {
      id_produto: true,
      nome: true,
      descricao: true,
      qtde_max_sabor: true,
      preco_padrao: true,
      tamanho: true,
      desconto: {
        select: {
          id_desconto: true,
          porcentagem_desconto: true,
        },
      },
      categoria: {
        select: {
          id_categoria: true,
          nome: true,
          desconto: {
            select: {
              id_desconto: true,
              porcentagem_desconto: true,
            },
          },
        },
      },
      produto_adicional: {
        select: {
          id_adicional: true,
          adicional: true,
        },
      },
      produto_sabor: {
        select: {
          id_sabor: true,
          sabor: true,
        },
      },
    },
  });

  const produtos: RelatedProduct[] = products.map((product) => ({
    id_produto: product.id_produto,
    nome: product.nome,
    descricao: product.descricao,
    qtde_max_sabor: product.qtde_max_sabor,
    preco_padrao: Number(product.preco_padrao),
    tamanho: product.tamanho,
    categoria: {
      id_categoria: product.categoria.id_categoria,
      desconto: product.categoria.desconto
        ? {
            id_desconto: product.categoria.desconto.id_desconto,
            porcentagem_desconto: product.categoria.desconto.porcentagem_desconto,
          }
        : null,
    },
    desconto: product.desconto
      ? {
          id_desconto: product.desconto.id_desconto,
          porcentagem_desconto: product.desconto.porcentagem_desconto,
        }
      : null,
    adicionais: product.produto_adicional.map((produto_adicional) => ({
      id_adicional: produto_adicional.id_adicional,
      nome: produto_adicional.adicional.nome,
      preco: Number(produto_adicional.adicional.preco),
    })),
    sabores: product.produto_sabor.map((produto_sabor) => ({
      id_sabor: produto_sabor.id_sabor,
      nome: produto_sabor.sabor.nome,
    })),
  }));

  return produtos;
}
