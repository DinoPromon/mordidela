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
import { MyUser } from "@my-types/next-auth";
import { UserGeneralData } from "@models/usuario";
import { formatPhoneNumber } from "@utils/formatters";

type GeneralDataProps = {
  user: MyUser;
  userGeneralData: UserGeneralData;
};

const GeneralData: React.FC<GeneralDataProps> = ({ user, userGeneralData }) => {
  const textFieldGreater = customTextFieldGreater();

  function getFormatedPhone() {
    const { ddd, numero } = userGeneralData.telefone;
    return formatPhoneNumber(`${ddd}${numero}`);
  }

  return (
    <PageContainer>
      <GeneralDataTitle>Dados gerais</GeneralDataTitle>
      <GeneralDataContainer>
        <NumberOrders>
          <h3>{userGeneralData.count_pedido}</h3>
          <p>pedidos</p>
        </NumberOrders>
        <TextField
          label="Nome"
          variant="outlined"
          color="primary"
          value={userGeneralData.nome}
          required
          fullWidth
          autoComplete="off"
        />
        <CustomTextFieldSmallerContainer>
          <TextField
            label="Data de nascimento"
            variant="outlined"
            color="primary"
            value={new Date(userGeneralData.data_nascimento).toLocaleDateString()}
            fullWidth
            required
            autoComplete="off"
          />
          <TextField
            label="Telefone"
            variant="outlined"
            value={getFormatedPhone()}
            color="primary"
            required
            fullWidth
            autoComplete="off"
          />
        </CustomTextFieldSmallerContainer>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={userGeneralData.email}
          color="primary"
          fullWidth
          autoComplete="off"
          disabled
        />
        <Button variant="contained" color="secondary">
          Salvar alterações
        </Button>
      </GeneralDataContainer>
    </PageContainer>
  );
};

export default GeneralData;
