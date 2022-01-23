import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const addresses = await prisma.endereco.findMany({
        include: {
          usuario: {
            select: {
              nome: true,
            },
          },
        },
      });
      prisma.$disconnect();
      return res.status(200).json(addresses);
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  res.status(400).json({ message: "Requisição inválida." });
};

export default handler;
