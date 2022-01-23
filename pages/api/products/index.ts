import type { NextApiHandler } from "next";
import mysql from "database";
import { Prisma } from "database";

export const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const products = await Prisma.produto.findMany({
        select: {
          id_produto: true,
          preco_padrao: true,
          nome: true,
          disponivel: true,
          descricao: true,
          tamanho: true,
          qtde_max_sabor: true,
          id_categoria: true,
          id_desconto: true,
        },
      });
      await mysql.end();
      return res.status(200).json(products);
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: "Aconteceu algo de errado com a requisição." });
    }
  }

  res.status(400).json({ message: "Requisição inválida." });
  res.end();
};

export default handler;
