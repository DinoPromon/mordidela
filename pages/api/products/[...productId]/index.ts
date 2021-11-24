import type { NextApiHandler } from "next";
import mysql from "database";
import { getAddsByProductId } from "database/adds";
import { getFlavosrByProductId } from "database/flavors";
import { getProductById } from "database/products";

const handler: NextApiHandler = async (req, res) => {
  const { productId } = req.query;

  if (req.method === "GET") {
    try {
      const product = await getProductById(productId as string);
      const adds = await getAddsByProductId(productId as string);
      const flavors = await getFlavosrByProductId(productId as string);
      await mysql.end();
      
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
