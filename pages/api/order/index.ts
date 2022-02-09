import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { Prisma } from "database";
import { OrderRepo } from "@repository/order";
import { createManyProductOrderRelations } from "@controllers/pedido/createOrderWithRelations";
import { CartPedido } from "@models/pedido";
import { CartProduto } from "@models/produto";
import { ReqMethod } from "@my-types/backend/req-method";

const handler: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: "É necessário autenticação para este endpoint." });
    }

    switch (req.method) {
      case ReqMethod.POST:
        const { produtos, pedido } = req.body as { produtos: CartProduto[]; pedido: CartPedido };
        if (pedido.id_usuario !== session.user.id_usuario)
          return res.status(403).json({ message: "Não pode inserir pedidos para outro usuário." });

        const orderId = await OrderRepo.createOrder(pedido);
        await createManyProductOrderRelations(orderId, produtos);

        return res.status(200).json({ success: true });
      case ReqMethod.GET:
        const orders = await Prisma.pedido.findMany();

        return res.status(200).json(orders);
      default:
        res.setHeader("Allow", [ReqMethod.GET, ReqMethod.POST]);
        return res.status(405).json({ message: "Requsição inválida." });
    }
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export default handler;
