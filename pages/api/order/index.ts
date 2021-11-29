import { NextApiHandler } from "next";

import { insertPedido } from "@controllers/order";
import { insertPedidoProdutoAdicional } from "@controllers/order_product_add";
import { insertPedidoProdutoSabor } from "@controllers/order_product_flavor";
import { insertPedidoProduto } from "@controllers/order_product";
import mysql from "database";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { produtos, pedido } = req.body;
      const produtosJson = produtos.map((p: any) => ({
        ...p,
        adicionais: JSON.parse(p.adicionais),
        sabores: JSON.parse(p.sabores),
      }));

      const id_pedido = await insertPedido(pedido);
      for (const i in produtosJson) {
        if (produtosJson[i].adicionais.length) {
          await insertPedidoProdutoAdicional(
            id_pedido,
            produtosJson[i].id_produto,
            produtosJson[i].adicionais
          );
        }
        if (produtosJson[i].sabores.length) {
          await insertPedidoProdutoSabor(id_pedido, produtosJson[i].id_produto, produtosJson[i].sabores);
        }
        await insertPedidoProduto({
          id_pedido,
          id_produto: produtosJson[i].id_produto,
          quantidade: produtosJson[i].quantidade,
          observacao: produtosJson[i].observacao === '' ? null : produtosJson[i].observacao,
        });
      }
      await mysql.end();

      return res.status(200).json({ success: true });
    } catch (e) {
      const error = e as Error;
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  }

  res.status(400).json({ message: "Requsição inválida." });
};

export default handler;
