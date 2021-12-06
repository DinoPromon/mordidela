import React from "react";

import CustomList from "./styled";
import OrderHistory from "./OrderHistory";
import { ViewPedidoForClient } from "@models/views";

const DUMMY_DATA = Object.freeze([
  {
    id_pedido: "24",
    data_confirmacao: null,
    data_pedido: "2021-12-03T14:17:16.000Z",
    endereco: "Rua alemanha nº 67, Jardim Manaus",
    status_pedido: "pendente",
    tipo_entrega: "entrega",
    tipo_pagamento: "credito",
    troco: 0,
    troco_para: 0,
    valor_total: 15.9,
  },
  {
    id_pedido: "23",
    data_confirmacao: null,
    data_pedido: "2021-12-03T14:17:16.000Z",
    endereco: "Rua alemanha nº 67, Jardim Manaus",
    status_pedido: "pendente",
    tipo_entrega: "entrega",
    tipo_pagamento: "credito",
    troco: 0,
    troco_para: 0,
    valor_total: 15.9,
  },
  {
    id_pedido: "30",
    data_confirmacao: null,
    data_pedido: "2021-12-03T14:17:16.000Z",
    endereco: "Rua alemanha nº 67, Jardim Manaus",
    status_pedido: "rejeitado",
    tipo_entrega: "entrega",
    tipo_pagamento: "credito",
    troco: 0,
    troco_para: 0,
    valor_total: 15.9,
  },
  {
    id_pedido: "28",
    data_confirmacao: null,
    data_pedido: "2021-12-03T14:17:16.000Z",
    endereco: "Rua alemanha nº 67, Jardim Manaus",
    status_pedido: "confirmado",
    tipo_entrega: "entrega",
    tipo_pagamento: "credito",
    troco: 0,
    troco_para: 0,
    valor_total: 15.9,
  },
]);

const OrdersHistoryList: React.FC = (props) => {
  return (
    <CustomList>
      {DUMMY_DATA.map(data => <OrderHistory key={data.id_pedido} order={data as ViewPedidoForClient}/>)}
    </CustomList>
  );
};

export default OrdersHistoryList;
