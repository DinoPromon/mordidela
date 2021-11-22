import { getProductNameById, getProductSizesByName } from "database/products";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { productId } = req.query;

  if (req.method === "GET") {
    try {
      const nome = await getProductNameById(productId as string);
      if (!nome) return res.status(400).json({ message: "Produto não encontrado." });

      const result = await getProductSizesByName(nome);
      if (!result) return res.status(400).json({ message: `Nenhum produto com nome ${nome} encontrado.` });

      return res.status(200).json(result);
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: error.message });
    }
  }
  res.status(400).json({ message: "Requisição inválida." });
};

export default handler;
