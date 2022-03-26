import { Prisma } from "@backend";

import { throwError } from "@errors/index";
import type { ProductDiscount } from "@models/produto";

export class FindAllProductRelations {
  constructor() {}

  public async exec() {
    const productRelations = await this.findAllRelations();

    return productRelations;
  }

  private getProductDiscount(discount: ProductDiscount | null) {
    if (discount) {
      return {
        id_desconto: discount.id_desconto,
        porcentagem_desconto: discount.porcentagem_desconto,
      } as ProductDiscount;
    }

    return null;
  }

  private async findAllRelations() {
    const productRelations = await Prisma.produto
      .findMany({
        where: {
          disponivel: true,
        },
        select: {
          id_produto: true,
          nome: true,
          descricao: true,
          nome_imagem: true,
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
            where: {
              sabor: {
                deletado: false,
              },
            },
            select: {
              id_sabor: true,
              sabor: true,
            },
          },
        },
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Algo de inesperado aconteceu" });
      });

    const produtos: any[] = productRelations.map((product) => ({
      ...product,
      desconto: this.getProductDiscount(product.desconto),
      categoria: product.categoria && {
        id_categoria: product.categoria.id_categoria,
        nome: product.categoria.nome,
        desconto: this.getProductDiscount(product.categoria.desconto),
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

    return produtos as unknown;
  }
}
