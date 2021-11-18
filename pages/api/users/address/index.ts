import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const email = req.query.email as string;

  if (session?.user?.email !== email) {
    if (!email) {
      res.status(400).json({ message: "Requisição mal formatada." });
    }

    res.status(401).json({ message: "É necessário autenticação para acessar os dados." });
  }

  if (req.method === "GET") {
  }
};

export default handler;
