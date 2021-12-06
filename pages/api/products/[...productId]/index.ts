import type { NextApiHandler } from "next";

import { getProdutoById } from "@controllers/produto";
import { getSaboresByIdProduto } from "@controllers/sabor";
import { getAddsByProductId } from "@controllers/adicional";

const handler: NextApiHandler = async (req, res) => {
  const { productId } = req.query;

  if (req.method === "GET") {
    try {
      const product = await getProdutoById(productId as string);
      const adds = await getAddsByProductId(productId as string);
      const flavors = await getSaboresByIdProduto(productId as string);
  
      const info = {
        ...product,
        adicional: adds,
        sabor: flavors,
      };
      return res.status(200).json(info);
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  res.status(400).json({ message: "Requisição inválida." });
};

export default handler;
