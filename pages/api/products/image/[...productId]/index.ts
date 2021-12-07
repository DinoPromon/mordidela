import type { NextApiHandler } from "next";
import mysql from "database";

import { getImagemProdutoById } from "@controllers/produto";

const handler: NextApiHandler = async (req, res) => {
  const { productId } = req.query;

  if (!productId) return res.status(400).json({ message: "Produto não definido." });

  if (req.method === "GET") {
    try {
      const result = await getImagemProdutoById(productId as string);
      await mysql.end();
      if (!result) return res.status(400).json({ message: "Produto não encontrado." });
      return res.setHeader("Content-Type", "blob").status(200).send(result.imagem);
    } catch (e) {
      const error = e as Error;
      console.log(error.message);
      return res.status(500).json({ message: "Houve um erro na conexão ao banco." });
    }
  }

  res.status(400).json({ message: "Requisição inválida." });
};

export default handler;
