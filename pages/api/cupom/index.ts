import { getSession } from "next-auth/client";
import { findCupomByCode } from "@controllers/cupom";
import { findOrdersCountByUserId } from "@controllers/pedido";
import { findUserCupomByCupomId } from "@controllers/usuario_cupom";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { codigo } = req.query;
  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Não autenticado." });

  if (req.method === "GET") {
    if (codigo) {
      try {
        const cupom = await findCupomByCode(String(codigo));
        if (!cupom) return res.status(403).json({ message: "Cupom não encontrado" });

        const isUsedCupom = Boolean(await findUserCupomByCupomId(cupom.id_cupom));
        if (isUsedCupom) return res.status(403).json({ message: "Cupom já utilizado!" });

        const countOrders = await findOrdersCountByUserId(session.user.id_usuario);
        if (cupom.qtde_min_pedido > countOrders) {
          return res.status(403).json({
            message: "Você não possui os requisitos mínimos do cupom para utilizar este cupom.",
          });
        }

        const startDate = new Date(cupom.data_inicio || "");
        const endDate = new Date(cupom.data_fim || "");
        const currentDate = new Date();
        if (startDate > currentDate) {
          return res.status(403).json({ message: "Cupom não disponível ainda." });
        }

        if (endDate < currentDate) {
          return res.status(403).json({ message: "Cupom expirado!" });
        }

        return res.status(200).json(cupom);
      } catch (e) {
        const error = e as Error;
        return res.status(500).json({ message: error.message });
      }
    }
  }

  res.status(405).json({ message: "Requisição inválida." });
};

export default handler;
