import React from "react";

import CustomList from "./styled";
import OrderItem from "./OrderItem";
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
]);

const OrdersList: React.FC = (props) => {
  return (
    <CustomList>
      teste
      {/* {DUMMY_DATA.map((data) => (
        <OrderItem orderData={data as ViewPedidoForClient} key={data.id_pedido} />
      ))} */}
    </CustomList>
  );
};

export default OrdersList;
