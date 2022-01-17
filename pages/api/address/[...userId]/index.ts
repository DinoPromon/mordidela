import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import Usuario from "@models/usuario";
import { getAllAddressByUserId } from "@controllers/endereco";
import { getDeliveryPriceByUserId } from "@controllers/entrega";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const { userId } = req.query;

  if (!session) {
    return res.status(401).json({ message: "É necessário autenticação para este endpoint." });
  }

  if (req.method === "GET") {
    try {
      const addresses = await getAllAddressByUserId(userId as Usuario["id_usuario"]);
      return res.status(200).json({
        address: addresses,
      });
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  res.status(400).json({ message: "Requisição inválida." });
};

export default handler;
