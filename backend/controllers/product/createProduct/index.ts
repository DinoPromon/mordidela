import { Prisma } from "@backend";
import { UUIDParse } from "@helpers/uuid";
import { throwError } from "@errors/index";
import { ImageHandler } from "@helpers/image";

import { CreateProductParser } from "./parser";
import { CreateProductValidator } from "./validator";

import type { File as FormidableFile } from "formidable";
import type IProduto from "@models/produto";
import type { ProductCreate } from "@models/produto";
import type { CreateProductArg } from "./types";

export class CreateProduct {
  private image?: FormidableFile;
  private createArg: ProductCreate;
  private validator: CreateProductValidator;

  constructor(createProductArgs: CreateProductArg, image?: FormidableFile) {
    const parser = new CreateProductParser(createProductArgs);
    this.createArg = parser.parse();
    this.validator = new CreateProductValidator(this.createArg);
    this.image = image;
  }

  public async exec() {
    this.validator.validate();

    const { adicionais, sabores, ...productData } = this.createArg;

    const createdProduct = await this.createProduct(productData);

    await this.createProductAdds(createdProduct.id_produto, adicionais);

    await this.createProductFlavors(createdProduct.id_produto, sabores);

    return createdProduct;
  }

  private async createProductAdds(productId: number, adds: ProductCreate["adicionais"]) {
    if (!adds) return;

    const createAddsRelationsData = adds.map((add) => ({
      id_produto: productId,
      id_adicional: add,
    }));

    const createdRelations = await Prisma.produto_adicional
      .createMany({
        data: createAddsRelationsData,
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Algo de inesperado aconteceu" });
      });

    return createdRelations;
  }

  private async createProductFlavors(productId: number, flavors: ProductCreate["sabores"]) {
    if (!flavors) return;

    const createFlavorsRelationsData = flavors.map((flavor) => ({
      id_produto: productId,
      id_sabor: flavor,
    }));

    const createdRelations = await Prisma.produto_sabor
      .createMany({
        data: createFlavorsRelationsData,
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Algo de inesperado aconteceu" });
      });

    return createdRelations;
  }

  private async createProduct(productData: Omit<ProductCreate, "adicionais" | "sabores">) {
    const [binUUID, stringUUID] = this.createUUID();

    const productImageHandler = this.createImage(stringUUID);

    const createdProduct = await Prisma.produto
      .create({
        data: {
          ...productData,
          uuid: binUUID,
          nome_imagem: productImageHandler ? productImageHandler.getFileName(stringUUID) : null,
        },
      })
      .catch((err) => {
        console.log(err);
        throwError("O-C-DI");
      });

    return {
      ...createdProduct,
      uuid: stringUUID,
    } as IProduto;
  }

  private createUUID() {
    const binUUID = UUIDParse.createBinUUID();
    const stringUUID = UUIDParse.getStringUUID(binUUID);

    return [binUUID, stringUUID] as [Buffer, string];
  }

  private createImage(newImageName?: string) {
    if (!this.image) return null;

    const productImageHandler = new ImageHandler(this.image);
    const moved = productImageHandler.moveToPublic(newImageName);
    if (!moved) throw new Error("Erro na criação da imagem");

    return productImageHandler;
  }
}
