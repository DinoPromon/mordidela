import Endereco from "@models/endereco";
import { NextApiHandler } from "next";
import { getDeliveryPriceByAddressId } from "@controllers/entrega";

const handler: NextApiHandler = async (req, res) => {
  const { addressId } = req.query;

  if (req.method === "GET") {
    try {
      const deliveryPrice = await getDeliveryPriceByAddressId(
        Number(addressId) as Endereco["id_endereco"]
      );
      return res.status(200).json({ preco_entrega: deliveryPrice });
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  res.status(400).json({ message: "Requisição inválida." });
};

export default handler;
