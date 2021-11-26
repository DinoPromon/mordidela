import type { NextApiHandler } from "next";
import mysql from "database";

import { getAllProducts } from "@controllers/products";

export const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const products = await getAllProducts();
      await mysql.end();
      return res.status(200).json(products);
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: "Aconteceu algo de errado com a requisição." });
    }
  }

  res.status(400).json({ message: "Requisição inválida." });
  res.end();
};

export default handler;
