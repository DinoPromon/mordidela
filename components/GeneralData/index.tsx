import React from "react";
import { PageContainer } from "@components/shared";
import { OrdersTitle } from "./styled";

const GeneralData: React.FC = (props) => {
  return (
    <PageContainer>
      <OrdersTitle>Dados gerais</OrdersTitle>
    </PageContainer>
  );
};

export default GeneralData;