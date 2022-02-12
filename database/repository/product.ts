import { Prisma } from "@database";

import type IProduto from "@models/produto";

interface IProductCreate extends Omit<IProduto, "id_produto" | "uuid"> {
  uuid: Buffer;
}

export class ProductRepo {
  public static async create(product: IProductCreate) {
    const createdProduct = await Prisma.produto.create({
      data: {
        ...product,
      },
    });

    return createdProduct;
  }
}
