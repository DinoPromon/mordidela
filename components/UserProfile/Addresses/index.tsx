import React from "react";
import { CustomTextField, InputTextFormik, PageContainer, PageTitle } from "@components/shared";
import { AddressesContainer, CustomInputsDesign, AddAddress } from "./styled";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { FaPlusCircle } from "react-icons/fa";
import { CustomFade } from "@components/shared";
import { PINK, PURPLE } from "@utils/colors";

const Addresses: React.FC = (props) => {
  return (
    <PageContainer>
      <PageTitle>Endereços</PageTitle>
      <AddressesContainer>
        <CustomInputsDesign>
          <CustomTextField fullWidth autoComplete="off" variant="outlined" label="Logradouro *" />
          <CustomTextField autoComplete="off" variant="outlined" label="Número *" />
        </CustomInputsDesign>
        <CustomTextField fullWidth autoComplete="off" variant="outlined" label="Bairro *" />
        <CustomTextField fullWidth autoComplete="off" variant="outlined" label="Complemento" />
        <AddAddress>
          <FaPlusCircle size={16} color={PINK} />
          <p>Adicionar endereço</p>
        </AddAddress>
        <span>
          <Button size="large" variant="contained" color="secondary" type="submit">
            Salvar alterações
          </Button>
        </span>
{/*         <CustomFade triggerAnimation={values.delivery_type === "entrega"}>
          <CartAddress addresses={addresses} isLoadingAddress={isLoadingAddress} />
        </CustomFade> */}
      </AddressesContainer>
    </PageContainer>
  );
};

export default Addresses;
