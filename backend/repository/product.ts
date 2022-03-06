import { Prisma } from "@backend";

import type IProduto from "@models/produto";
import { UUIDParse } from "@helpers/uuid";

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

  public static async findAll() {
    const products = await Prisma.produto.findMany();
    const stringUUIDProducts: IProduto[] = products.map((product) => ({
      ...product,
      uuid: UUIDParse.getStringUUID(product.uuid),
    }));

    return stringUUIDProducts;
  }
}
