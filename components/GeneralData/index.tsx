import React from "react";
import { PageContainer } from "@components/shared";
import { GeneralDataTitle } from "./styled";

const GeneralData: React.FC = (props) => {
  return (
    <PageContainer>
      <GeneralDataTitle>Dados gerais</GeneralDataTitle>
    </PageContainer>
  );
};

export default GeneralData;