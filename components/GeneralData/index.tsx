import React from "react";
import { PageContainer } from "@components/shared";
import {
  GeneralDataTitle,
  GeneralDataContainer,
  NumberOrders,
  customTextFieldGreater,
  CustomTextFieldSmallerContainer,
} from "./styled";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const GeneralData: React.FC = (props) => {
  const textFieldGreater = customTextFieldGreater();


  return (
    <PageContainer>
      <GeneralDataTitle>Dados gerais</GeneralDataTitle>
      <GeneralDataContainer>
        <NumberOrders>
          <h3>15</h3>
          <p>pedidos</p>
        </NumberOrders>
        <TextField
/*           className={textFieldGreater.root} */
          id="nome"
          label="Nome"
          variant="outlined"
          color="primary"
          required
          fullWidth
          autoComplete="off"
        />
        <CustomTextFieldSmallerContainer>
          <TextField
            id="data_nasc"
            label="Data de nascimento"
            variant="outlined"
            color="primary"
            fullWidth
            required
            autoComplete="off"
          />
          <TextField
            id="telefone"
            label="Telefone"
            variant="outlined"
            color="primary"
            required
            fullWidth
            autoComplete="off"
          />
        </CustomTextFieldSmallerContainer>
        <TextField
/*           className={textFieldGreater.root} */
          id="email"
          label="Email"
          variant="outlined"
          color="primary"
          fullWidth
          autoComplete="off"
        />
        <Button variant="contained" color="secondary">Salvar alterações</Button>
      </GeneralDataContainer>
    </PageContainer>
  );
};

export default GeneralData;
