import React, { Fragment, useEffect } from "react";
import Link from "next/link";
import RadioGroup from "@material-ui/core/RadioGroup";
import CircularProgress from "@material-ui/core/CircularProgress";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useFormikContext } from "formik";
import { FaPlusCircle } from "react-icons/fa";
import { PURPLE } from "@utils/colors";
import {
  CartAddAddress,
  CartAddressContainer,
  CartAddressLoadingContainer,
} from "./styled";
import { AddresComplement, AddresTitle } from "@components/shared/SharedStyledComponents";
import type { CartFormValues } from "../FormModel";
import type { AddressOnCart } from "@models/endereco";

type CartAddressProps = {
  isLoadingAddress: boolean;
  addresses: AddressOnCart[];
  onCloseModal: () => void;
};

const CartAddress: React.FC<CartAddressProps> = ({ addresses, isLoadingAddress, onCloseModal }) => {
  const { setFieldValue, values } = useFormikContext<CartFormValues>();

  function getFormatedAddress(address: AddressOnCart) {
    return `${address.logradouro} Nº ${address.numero}, ${address.bairro}`;
  }

  function changeRadioHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const addressId = Number(event.target.value);
    setFieldValue("address_id", addressId);
  }

  function getDeliveryPriceFromSelectedAddress(addressId: AddressOnCart["id_endereco"]) {
    const selectedAddress = addresses.find((address) => address.id_endereco === addressId);
    if (selectedAddress) return selectedAddress.entrega.preco_entrega;
    return null;
  }

  useEffect(() => {
    if (values.addressId) {
      const deliveryPrice = getDeliveryPriceFromSelectedAddress(values.addressId);
      setFieldValue("delivery_price", deliveryPrice);
    }
  }, [values.addressId]);

  return (
    <CartAddressContainer>
      {isLoadingAddress ? (
        <CartAddressLoadingContainer>
          <CircularProgress color="primary" />
        </CartAddressLoadingContainer>
      ) : (
        <Fragment>
          <AddresTitle>Endereços de entrega</AddresTitle>
          <RadioGroup
            name="address-input-radio"
            value={values.addressId}
            onChange={changeRadioHandler}
          >
            {addresses.length > 0 &&
              addresses.map((address) => (
                <FormControlLabel
                  label={
                    <Fragment>
                      <p>{getFormatedAddress(address)}</p>
                      <AddresComplement>
                        Complemento: {address.complemento}
                      </AddresComplement>
                    </Fragment>
                  }
                  key={`address-${address.id_endereco}`}
                  value={address.id_endereco}
                  control={<Radio color="secondary" />}
                />
              ))}
          </RadioGroup>
          <Link href={"/enderecos"}>
            <CartAddAddress onClick={onCloseModal}>
              <FaPlusCircle size={14} color={PURPLE} />
              <p>Adicionar endereço</p>
            </CartAddAddress>
          </Link>
        </Fragment>
      )}
    </CartAddressContainer>
  );
};

export default CartAddress;
