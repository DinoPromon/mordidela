import type { NextApiHandler } from "next";
import mysql from "database";
import { getAddsByProductId } from "database/adds";
import { getFlavosrByProductId } from "database/flavors";
import { getProductSizesById } from "database/products";

const handler: NextApiHandler = async (req, res) => {
  const { productId } = req.query;

  if (req.method === "GET") {
    try {
      const adds = await getAddsByProductId(productId as string);
      const flavors = await getFlavosrByProductId(productId as string);
      const sizes = await getProductSizesById(productId as string);
      await mysql.end();
      
      const info = {
        adicional: adds,
        sabor: flavors,
        tamanho: sizes
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
