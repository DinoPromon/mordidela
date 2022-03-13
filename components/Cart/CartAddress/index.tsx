import React, { Fragment, useCallback, useEffect } from "react";
import Link from "next/link";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useFormikContext } from "formik";
import { FaPlusCircle } from "react-icons/fa";

import { PURPLE } from "@utils/colors";
import { AddressComplement, AddressTitle } from "@components/shared/StyledComponents";

import { CartFadeVariant } from "../animations";
import { CartAddAddress, CartAddressContainer, CartAddressLoadingContainer } from "./styled";

import type { SetFieldValue } from "@my-types/formik";
import type { CartFormValues } from "../FormModel";
import type { AddressOnCart } from "@models/endereco";

type CartAddressProps = {
  isLoadingAddress: boolean;
  addresses: AddressOnCart[];
  onCloseModal: () => void;
};

const CartAddress: React.FC<CartAddressProps> = ({ addresses, isLoadingAddress, onCloseModal }) => {
  const { setFieldValue, values } = useFormikContext<CartFormValues>() as {
    setFieldValue: SetFieldValue<CartFormValues>;
    values: CartFormValues;
  };

  function getFormatedAddress(address: AddressOnCart) {
    return `${address.logradouro} Nº ${address.numero}, ${address.bairro}`;
  }

  function changeRadioHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const addressId = Number(event.target.value);
    setFieldValue("addressId", addressId);
  }

  const getDeliveryPriceFromSelectedAddress = useCallback(
    (addressId: AddressOnCart["id_endereco"]) => {
      const selectedAddress = addresses.find((address) => address.id_endereco === addressId);
      if (selectedAddress) return selectedAddress.entrega.preco_entrega;
      return null;
    },
    [addresses]
  );

  useEffect(() => {
    if (values.addressId) {
      const deliveryPrice = getDeliveryPriceFromSelectedAddress(values.addressId);
      setFieldValue("deliveryPrice", deliveryPrice);
    }
  }, [values.addressId, getDeliveryPriceFromSelectedAddress, setFieldValue]);

  return (
    <CartAddressContainer
      variants={CartFadeVariant}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {isLoadingAddress ? (
        <CartAddressLoadingContainer>
          <CircularProgress color="primary" />
        </CartAddressLoadingContainer>
      ) : (
        <Fragment>
          <AddressTitle>Endereços de entrega</AddressTitle>
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
                      <AddressComplement>Complemento: {address.complemento}</AddressComplement>
                    </Fragment>
                  }
                  key={`address-${address.id_endereco}`}
                  value={address.id_endereco}
                  control={<Radio color="secondary" />}
                />
              ))}
          </RadioGroup>
          <Link href={"/enderecos"} passHref>
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
