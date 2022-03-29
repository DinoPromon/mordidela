import { IncomingForm } from "formidable";
import { CreateProduct } from "@controllers/product";
import { ReqMethod } from "@my-types/backend/reqMethod";

import type IProduto from "@models/produto";
import type { NextApiHandler } from "next";
import type { File as FormidableFile } from "formidable";
import type { CreateProductArg } from "@controllers/product/createProduct/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const handler: NextApiHandler = async (req, res) => {
  if (req.method !== ReqMethod.POST && req.method !== ReqMethod.GET)
    res.status(400).json({ message: "Requisição inválida." });

  if (req.method === ReqMethod.GET) {
    try {
      return res.status(200).json("todo");
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: "Aconteceu algo de errado com a requisição." });
    }
  }

  if (req.method === ReqMethod.POST) {
    try {
      const createdProduct: IProduto = await new Promise((resolve, reject) => {
        const form = new IncomingForm();

        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          if (Array.isArray(files.imagem)) reject("Não há suporte para múltiplas imagens");

          const createProduct = new CreateProduct(
            fields as CreateProductArg,
            files.imagem as FormidableFile
          );

          createProduct
            .exec()
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        });
      });
      return res.status(200).json(createdProduct);
    } catch (err) {
      const error = err as Error;
      console.log(error);
      return res.status(500).json({ message: "Aconteceu um problema internamente" });
    }
  }
};

export default handler;
