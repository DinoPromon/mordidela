import Cupom from "@models/cupom";
import { getSession } from "next-auth/client";
import { CupomRepo } from "@controllers/cupom";
import { UserCupomRepo } from "@repository/user-cupom";
import { findOrdersCountByUserId, findCountOrdersWithCupomId } from "@controllers/pedido";
import { NextApiHandler } from "next";
import { ReqMethod } from "@my-types/backend/req-method";

const handler: NextApiHandler = async (req, res) => {
  const { codigo } = req.query;
  const session = await getSession({ req });

  if (req.method === ReqMethod.POST) {
    const cupomData = req.body as Omit<Cupom, "id_cupom">;
    const createdCupom = await CupomRepo.createCupom(cupomData);
    return res.status(201).json(createdCupom);
  }

  if (!session) return res.status(401).json({ message: "Não autenticado." });

  if (req.method === ReqMethod.GET) {
    if (codigo) {
      try {
        const cupom = await CupomRepo.findByCupomCode(String(codigo));
        if (!cupom) return res.status(403).json({ message: "Cupom não encontrado" });

        const userCupom = await UserCupomRepo.findByUserIdAndCupomId(
          session.user.id_usuario,
          cupom.id_cupom
        );
        if (!userCupom)
          return res.status(403).json({ message: "Você não pode utilizar este cupom!" });

        const countOrders = await findOrdersCountByUserId(session.user.id_usuario);
        if (cupom.qtde_min_pedido > countOrders) {
          return res.status(403).json({
            message: "Você não possui os requisitos mínimos do cupom para utilizá-lo.",
          });
        }

        if (cupom.quantidade_uso) {
          const usedAmountCupom = await findCountOrdersWithCupomId(cupom.id_cupom);
          if (usedAmountCupom <= cupom.quantidade_uso) {
            return res.status(403).json({
              message: "Cupom esgotado!",
            });
          }
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

  res.setHeader("Allow", [ReqMethod.GET, ReqMethod.POST]);
  res.status(405).json({ message: "Requisição inválida." });
};

export default handler;
