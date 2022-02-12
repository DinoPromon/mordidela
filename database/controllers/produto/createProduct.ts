import { ProductRepo } from "@repository/product";
import { UUIDParse } from "database/helpers/uuid";
import { ImageHandler } from "database/helpers/image";

import type IProduto from "@models/produto";
import type { File as FormidableFile } from "formidable";

type ProductCreate = Omit<IProduto, "id_produto" | "uuid" | "nome_imagem">;

type NonNullableProductCreateProps = Omit<
  ProductCreate,
  "qtde_max_sabor" | "descricao" | "id_desconto"
>;
type NullableProductCreateProps = Pick<
  ProductCreate,
  "qtde_max_sabor" | "descricao" | "id_desconto"
>;

export type CreateProductArg = {
  [key in keyof NonNullableProductCreateProps]: string | string[];
} & {
  [key in keyof NullableProductCreateProps]?: string | string[];
};

export class CreateProduct {
  private product: CreateProductArg;
  private image?: FormidableFile;

  constructor(product: CreateProductArg, image?: FormidableFile) {
    this.product = product;
    this.image = image;
  }

  public async exec() {
    const [binUUID, stringUUID] = this.createUUID();
    const productImageHandler = this.createImage(stringUUID);

    const productCreate: ProductCreate = this.getCreateProdudctArg();

    const createdProduct = await ProductRepo.create({
      ...productCreate,
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

  private getParsedDisponivel() {
    if (this.product.disponivel === "true") return true;
    return false;
  }

  private getCreateProdudctArg() {
    const productCreate: ProductCreate = {
      nome: String(this.product.nome),
      qtde_max_sabor: this.product.qtde_max_sabor ? Number(this.product.qtde_max_sabor) : null,
      descricao: this.product.descricao ? String(this.product.descricao) : null,
      disponivel: this.getParsedDisponivel(),
      preco_padrao: Number(this.product.preco_padrao),
      tamanho: String(this.product.tamanho),
      id_desconto: this.product.id_desconto ? Number(this.product.id_desconto) : null,
      id_categoria: Number(this.product.id_categoria),
    };

    return productCreate;
  }
}
