import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { insertPedido } from "@controllers/pedido";
import { CartPedido } from "@models/pedido";
import { CartProduto } from "@models/produto";
import { getAllPedidosFromUsuario } from "@controllers/pedido";
import { insertAllProdutosFromPedido } from "@controllers/produto";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "É necessário autenticação para este endpoint." });

  try {
    switch (req.method) {
      case "POST":
        const { produtos, pedido } = req.body as { produtos: CartProduto[]; pedido: CartPedido };
        if (pedido.id_usuario !== session.user.id_usuario)
          return res.status(403).json({ message: "Não pode inserir pedidos para outro usuário." });

        const produtosJson = produtos.map((p) => ({
          ...p,
          adicionais: JSON.parse(p.adicionais as string),
          sabores: JSON.parse(p.sabores as string),
        })) as CartProduto[];

        const id_pedido = await insertPedido(pedido);
        await insertAllProdutosFromPedido(id_pedido, produtosJson);

        return res.status(200).json({ success: true });
      case "GET":
        const orders = await getAllPedidosFromUsuario(session.user.id_usuario);

        return res.status(200).json(orders);
      default:
        return res.status(405).json({ message: "Requsição inválida." });
    }
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export default handler;
