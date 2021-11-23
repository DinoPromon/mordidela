import type { NextApiHandler } from "next";
import mysql from "database";
import { getAddsByProductId } from "database/adds";

const handler: NextApiHandler = async (req, res) => {
  const { productId } = req.query;

  if (req.method === "GET") {
    try {
      const result = await getAddsByProductId(productId as string);
      await mysql.end();
      return res.status(200).json(result);
    } catch (e) {
      const error = e as Error;
      return res.status(400).json({ message: error.message });
    }
  }

  res.status(400).json({ message: "Requisição inválida." });
};

export default handler;
