import type { NextApiHandler } from "next";
import mysql from "database";
import { getSaboresByIdProduto } from "@controllers/sabor";

const handler: NextApiHandler = async (req, res) => {
  const { productId } = req.query;

  if (req.method === "GET") {
    try {
      const flavors = await getSaboresByIdProduto(productId as string);
      await mysql.end();
      return res.status(200).json(flavors);
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  res.status(400).json({ message: "Requisição inválida." });
};

export default handler;
