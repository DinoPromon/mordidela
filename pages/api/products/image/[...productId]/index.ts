import { getProductImageById } from "database/products";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { productId } = req.query;

  if (!productId) return res.status(400).json({ message: "Produto não definido." });

  if (req.method === "GET") {
    try {
      const image = await getProductImageById(productId as string);
      if (image === undefined) return res.status(400).json({ message: "Produto não encontrado." });

      return res.setHeader("Content-Type", "text").status(200).send(image.imagem);
    } catch (e) {
      const error = e as Error;
      console.log(error.message);
      return res.status(500).json({ message: "Houve um erro na conexão ao banco." });
    }
  }

  res.status(400).json({ message: "Requisição inválida." });
};

export default handler;
