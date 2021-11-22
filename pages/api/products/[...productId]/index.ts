import { getAddsByProductId } from "database/adds";
import { getFlavorById } from "database/flavors";
import { getProductSizesById } from "database/products";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { productId } = req.query;

  if (req.method === "GET") {
    try {
      const adds = await getAddsByProductId(productId as string);
      const flavors = await getFlavorById(productId as string);
      const sizes = await getProductSizesById(productId as string);

      const info = {
        adicional: adds,
        sabor: flavors,
        tamanho: sizes.map((size) => ({ preco_padrao: size.preco_padrao, tamanho: size.tamanho })),
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
