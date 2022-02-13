import React from "react";
import { CustomTextField, PageContainer, PageTitle } from "@components/shared";
import {
  AddressesInputContainer,
  CustomInputsDesign,
  AddressContainer,
  ShowAddress,
  AddresData,
  AddresIcons,
} from "./styled";
import { FaTrash } from "react-icons/fa";
import { PINK, PURPLE } from "@utils/colors";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { HiOutlineLocationMarker } from "react-icons/hi/index";
import { BsPencil } from "react-icons/bs/index";

const Addresses: React.FC = (props) => {
  return (
    <PageContainer>
      <PageTitle>Endereços</PageTitle>
      <AddressesInputContainer>
        <CustomInputsDesign>
          <CustomTextField fullWidth autoComplete="off" variant="outlined" label="Logradouro *" />
          <CustomTextField autoComplete="off" variant="outlined" label="Número *" />
        </CustomInputsDesign>
        <CustomTextField fullWidth autoComplete="off" variant="outlined" label="Bairro *" />
        <CustomTextField fullWidth autoComplete="off" variant="outlined" label="Complemento" />
        <span>
          <Button size="large" variant="contained" color="secondary" type="submit">
            Adicionar endereço
          </Button>
        </span>
      </AddressesInputContainer>
      <AddressContainer>
        <h3>Endereços cadastrados</h3>
        <ShowAddress>
          <span>
            <HiOutlineLocationMarker size={40} color={PINK} />
          </span>
          <AddresData>
            <p>Rua dos Alfeneiros Nº 4, Little Whinging</p>
            <p>Complemento: </p>
          </AddresData>
          <AddresIcons>
            <Tooltip title="Editar endereço" placement="bottom">
              <span>
                <BsPencil size={20} color={PURPLE} />
              </span>
            </Tooltip>
            <Tooltip title="Excluir endereço" placement="bottom">
              <span>
                <FaTrash size={20} color={PURPLE} />
              </span>
            </Tooltip>
          </AddresIcons>
        </ShowAddress>

        <ShowAddress>
          <span>
            <HiOutlineLocationMarker size={40} color={PINK} />
          </span>
          <AddresData>
            <p>Rua dos Alfeneiros Nº 4, Little Whinging</p>
            <p>Complemento: </p>
          </AddresData>
          <AddresIcons>
            <Tooltip title="Editar endereço" placement="bottom">
              <span>
                <BsPencil size={20} color={PURPLE} />
              </span>
            </Tooltip>
            <Tooltip title="Excluir endereço" placement="bottom">
              <span>
                <FaTrash size={20} color={PURPLE} />
              </span>
            </Tooltip>
          </AddresIcons>
        </ShowAddress>
      </AddressContainer>
    </PageContainer>
  );
};

export default Addresses;
