import { getSession } from "next-auth/client";
import { CupomRepo } from "@repository/cupom";
import { ReqMethod } from "@my-types/backend/req-method";
import { FindCouponByCode } from "@controllers/coupon";

import type ICupom from "@models/cupom";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { codigo } = req.query;
  const session = await getSession({ req });

  if (req.method === ReqMethod.POST) {
    const cupomData = req.body as Omit<ICupom, "id_cupom">;
    const createdCupom = await CupomRepo.create(cupomData);
    return res.status(201).json(createdCupom);
  }

  if (!session) return res.status(401).json({ message: "Não autenticado." });

  if (req.method === ReqMethod.GET) {
    if (codigo) {
      try {
        const userId = session.user.id_usuario;
        const findCouponByCode = new FindCouponByCode(String(codigo));
        const coupon = await findCouponByCode.find();

        if (!coupon) return res.status(404).json({ message: "Cupom não encontrado" });

        const canUserUseCoupom = await findCouponByCode.verifyCouponUsability(coupon, userId);
        if (!canUserUseCoupom) {
          return res.status(403).json({ message: "Você não pode utilizar este cupom!" });
        }

        const userHasMinRequisits = await findCouponByCode.verifyCouponMinRequisits(coupon, userId);
        if (!userHasMinRequisits) {
          return res.status(403).json({
            message: "Você não possui os requisitos mínimos do cupom para utilizá-lo.",
          });
        }

        const isCouponAvailable = await findCouponByCode.verifyCouponAvailability(coupon);
        if (!isCouponAvailable) {
          return res.status(403).json({
            message: "Cupom esgotado!",
          });
        }

        const isCupomValid = findCouponByCode.verifyCouponValidty(coupon);
        if (!isCupomValid) {
          return res.status(403).json({ message: "Cupom não disponível ainda." });
        }

        return res.status(200).json(coupon);
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
