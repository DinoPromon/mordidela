import React, { memo } from "react";
import { FaTrash } from "react-icons/fa/index";
import { BsPencil } from "react-icons/bs/index";
import { HiOutlineLocationMarker } from "react-icons/hi/index";

import ClickableItem from "@components/shared/ClickableItem";
import { PURPLE, PINK } from "@utils/colors";

import {
  AddressesListItem,
  AddressDataContainer,
  AddressIconsContainer,
  AddressesListContainer,
} from "./styled";

import type IEndereco from "@models/endereco";

type AddressesListProps = {
  addresses: IEndereco[];
  onEditAddress: (address: IEndereco) => void;
  onDeleteAddress: (address: IEndereco) => Promise<void>;
};

type AddressesListType = (props: AddressesListProps) => JSX.Element;

const AddressesList: AddressesListType = ({ addresses, onEditAddress, onDeleteAddress }) => {
  function getFormattedAddressText(address: IEndereco) {
    return `${address.logradouro} N° ${address.numero}, ${address.bairro}`;
  }

  function getEditAddressClickHandler(address: IEndereco) {
    return () => {
      onEditAddress(address);
    };
  }

  function getDeleteAddressClickHandler(address: IEndereco) {
    return () => {
      onDeleteAddress(address);
    };
  }

  return (
    <AddressesListContainer>
      <h3>Endereços cadastrados</h3>

      {addresses.map((address) => (
        <AddressesListItem key={`address-${address.id_endereco}`}>
          <span>
            <HiOutlineLocationMarker size={40} color={PINK} />
          </span>
          <AddressDataContainer>
            <p>{getFormattedAddressText(address)}</p>
            {address.complemento && <p>{`Complemento: ${address.complemento}`}</p>}
          </AddressDataContainer>
          <AddressIconsContainer>
            <ClickableItem
              scale={1.25}
              placement="bottom"
              title="Editar endereço"
              onClick={getEditAddressClickHandler(address)}
            >
              <BsPencil size={20} color={PURPLE} />
            </ClickableItem>
            <ClickableItem
              title="Excluir endereço"
              placement="bottom"
              scale={1.25}
              onClick={getDeleteAddressClickHandler(address)}
            >
              <FaTrash size={20} color={PURPLE} />
            </ClickableItem>
          </AddressIconsContainer>
        </AddressesListItem>
      ))}
    </AddressesListContainer>
  );
};

export default memo(AddressesList);
