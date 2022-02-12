import { Prisma } from "database";
import { IncomingForm } from "formidable";
import { UUIDParse } from "database/helpers/uuid";
import { ProductRepo } from "@repository/product";
import { ImageHandler } from "database/helpers/image";
import { ReqMethod } from "@my-types/backend/req-method";

import type { produto } from "@prisma/client";
import type { NextApiHandler } from "next";
import type { File as FormidableFile } from "formidable";

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
      const products = await Prisma.produto.findMany({
        select: {
          id_produto: true,
          preco_padrao: true,
          nome: true,
          disponivel: true,
          descricao: true,
          tamanho: true,
          qtde_max_sabor: true,
          id_categoria: true,
          id_desconto: true,
        },
      });
      return res.status(200).json(products);
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: "Aconteceu algo de errado com a requisição." });
    }
  }

  if (req.method === ReqMethod.POST) {
    try {
      const createdProduct: produto = await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        console.log(form);
        form.parse(req, (err, fields, files) => {
          console.log("caiu aqui");
          if (err) reject(err);
          if (Array.isArray(files.imagem)) reject("Várias imagens não suportadas");
          const {
            preco_padrao,
            nome,
            disponivel,
            descricao,
            tamanho,
            qtde_max_sabor,
            id_categoria,
            id_desconto,
          } = fields;

          const binUUID = UUIDParse.createBinUUID();
          const stringUUID = UUIDParse.getStringUUID(binUUID);

          let imageHelper: ImageHandler | undefined;
          if (files.imagem) {
            imageHelper = new ImageHandler(files.imagem as FormidableFile);
            const moved = imageHelper.moveToPublic(stringUUID);
            if (!moved) throw new Error("Erro na criação da imagem");
          }

          ProductRepo.create({
            nome: String(nome),
            tamanho: String(tamanho),
            qtde_max_sabor: Number(qtde_max_sabor) || null,
            id_categoria: Number(id_categoria),
            id_desconto: Number(id_desconto) || null,
            disponivel: Boolean(disponivel),
            descricao: String(descricao) || null,
            preco_padrao: Number(preco_padrao),
            uuid: binUUID,
            nome_imagem: imageHelper ? imageHelper.getFileName(stringUUID) : null,
          })
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
