import { getDeliveryPriceByUserId } from "@controllers/delivery";
import Usuario from "@models/usuario";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { userId } = req.query;

  if (req.method === "GET") {
    try {
      const deliveryPrice = await getDeliveryPriceByUserId(userId as Usuario["id_usuario"]);
      return res.status(200).json({ preco_entrega: deliveryPrice });
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  res.status(400).json({ message: "Requisição inválida." });
};

export default handler;
