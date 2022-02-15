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
  CartAddressTitle,
  CartAddressContainer,
  CartAddressComplement,
  CartAddressLoadingContainer,
} from "./styled";

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
    if (values.address_id) {
      const deliveryPrice = getDeliveryPriceFromSelectedAddress(values.address_id);
      setFieldValue("delivery_price", deliveryPrice);
    }
  }, [values.address_id]);

  return (
    <CartAddressContainer>
      {isLoadingAddress ? (
        <CartAddressLoadingContainer>
          <CircularProgress color="primary" />
        </CartAddressLoadingContainer>
      ) : (
        <Fragment>
          <CartAddressTitle>Endereços de entrega</CartAddressTitle>
          <RadioGroup
            name="address-input-radio"
            value={values.address_id}
            onChange={changeRadioHandler}
          >
            {addresses.length > 0 &&
              addresses.map((address) => (
                <FormControlLabel
                  label={
                    <Fragment>
                      <p>{getFormatedAddress(address)}</p>
                      <CartAddressComplement>
                        Complemento: {address.complemento}
                      </CartAddressComplement>
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
