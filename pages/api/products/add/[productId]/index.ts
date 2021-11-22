import { getAddsByProductId } from "database/adds";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { productId } = req.query;

  if (req.method === "GET") {
    try {
      const result = await getAddsByProductId(productId as string);
      return res.status(200).json(result);
    } catch (e) {
      const error = e as Error;
      return res.status(400).json({ message: error.message });
    }
  }

  res.status(400).json({ message: "Requisição inválida." });
};

export default handler;
