import { ProductRepo } from "@repository/product";
import { UUIDParse } from "database/helpers/uuid";
import { ImageHandler } from "database/helpers/image";
import { CreateProductValidator } from "./validator";

import type IProduto from "@models/produto";
import type { File as FormidableFile } from "formidable";
import type { CreateProductArg } from "./validator/parser";

export class CreateProduct {
  private image?: FormidableFile;
  private validator: CreateProductValidator;

  constructor(createProductArgs: CreateProductArg, image?: FormidableFile) {
    this.validator = new CreateProductValidator(createProductArgs);
    this.image = image;
  }

  public async exec() {
    const [binUUID, stringUUID] = this.createUUID();
    const productImageHandler = this.createImage(stringUUID);

    this.validator.validate();

    const createdProduct = await ProductRepo.create({
      ...this.validator.getCreateProductData(),
      uuid: binUUID,
      nome_imagem: productImageHandler ? productImageHandler.getFileName(stringUUID) : null,
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
