import { Prisma } from "database";
import { RelatedProduct } from "@models/produto";
import { ProductDiscount } from "@models/produto";

function getProductDiscount(discount: ProductDiscount | null) {
  if (discount) {
    return {
      id_desconto: discount.id_desconto,
      porcentagem_desconto: discount.porcentagem_desconto,
    } as ProductDiscount;
  }

  return null;
}

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
    desconto: getProductDiscount(product.desconto),
    categoria: {
      id_categoria: product.categoria.id_categoria,
      nome: product.categoria.nome,
      desconto: getProductDiscount(product.categoria.desconto),
    },
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
