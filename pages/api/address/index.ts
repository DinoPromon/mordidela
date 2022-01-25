import { NextApiHandler } from "next";
import { Prisma } from "database";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const addresses = await Prisma.endereco.findMany({
        include: {
          usuario: true,
        },
      });
      return res.status(200).json(addresses);
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  res.status(400).json({ message: "Requisição inválida." });
};

export default handler;
