import React, { useState } from "react";
import { Formik } from "formik";
import { getSession } from "next-auth/client";
import { FaTrash } from "react-icons/fa/index";
import { BsPencil } from "react-icons/bs/index";
import type { RequestState } from "@my-types/request";
import { HiOutlineLocationMarker } from "react-icons/hi/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ErrorMessage } from "@components/shared/StyledComponents";
import { ErrorMessageContainer } from "@components/Login/LoginForm/styled";

import Axios from "@api";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { getAddressFormArg } from "./Submit";
import { PINK, PURPLE } from "@utils/colors";
import { InputTextFormik } from "@components/shared";
import { PageContainer, PageTitle } from "@components/shared";
import {
  getAddressesFormModel,
  getAddressesFormInitialValues,
  getAddressesFormValidationSchema,
  IAddressesFormValues,
} from "./FormModel";
import {
  AddressListItem,
  AddresData,
  AddresIcons,
  AddressListContainer,
  CustomInputsDesign,
  AddressesFormikForm,
  AddressesFormButtonContainer,
} from "./styled";

import type IEndereco from "@models/endereco";

type AddressesProps = {
  addresses: IEndereco[];
};

const Addresses: React.FC<AddressesProps> = ({ addresses }) => {
  const [requestStatus, setRequestStatus] = useState<RequestState>({ error: "", isLoading: false });
  const formModel = getAddressesFormModel();

  function getFormattedAddressText(address: IEndereco) {
    return `${address.logradouro} N° ${address.numero}, ${address.bairro}`;
  }

  async function addressFormSubmitHandler(values: IAddressesFormValues) {
    setRequestStatus({ error: "", isLoading: true });
    try {
      const addressesFormArg = getAddressFormArg(values);
      const session = await getSession();
      if (!session) return;

      await Axios.post(`address/${session.user.id_usuario}`, addressesFormArg);
    } catch (e) {
      const error = e as Error;
      setRequestStatus({ error: error.message, isLoading: false });
    }
    setRequestStatus((prevState) => ({ ...prevState, isLoading: false }));
  }

  /*   async function addressFormSubmitHandler(values: IAddressesFormValues) {
    const addressesFormArg = getAddressFormArg(values);
    const session = await getSession();
    if (!session) return;

    await Axios.post(`address/${session.user.id_usuario}`, addressesFormArg);
  } */

  return (
    <PageContainer>
      <PageTitle>Endereços</PageTitle>
      <Formik
        validateOnMount
        enableReinitialize
        validateOnChange={false}
        validationSchema={getAddressesFormValidationSchema(formModel)}
        initialValues={getAddressesFormInitialValues()}
        onSubmit={addressFormSubmitHandler}
      >
        {({ values, isValid, dirty }) => (
          <AddressesFormikForm>
            <CustomInputsDesign>
              <InputTextFormik
                value={values.publicPlace}
                name={formModel.publicPlace.name}
                label={formModel.publicPlace.label}
                helperText={formModel.publicPlace.requiredErrorMessage}
                fullWidth
                autoComplete="off"
                variant="outlined"
              />
              <InputTextFormik
                value={values.number}
                name={formModel.number.name}
                label={formModel.number.label}
                helperText={formModel.number.requiredErrorMessage}
                autoComplete="off"
                variant="outlined"
              />
            </CustomInputsDesign>
            <InputTextFormik
              value={values.neighborhood}
              name={formModel.neighborhood.name}
              label={formModel.neighborhood.label}
              helperText={formModel.neighborhood.requiredErrorMessage}
              fullWidth
              autoComplete="off"
              variant="outlined"
            />
            <InputTextFormik
              value={values.complement}
              name={formModel.complement.name}
              label={formModel.complement.label}
              fullWidth
              autoComplete="off"
              variant="outlined"
            />
            <AddressesFormButtonContainer>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                type="submit"
                disabled={!(isValid && dirty) || requestStatus.isLoading}
              >
                {requestStatus.isLoading ? <CircularProgress color="primary" size={24} /> : "Adicionar endereço"}
              </Button>
            </AddressesFormButtonContainer>
            <ErrorMessageContainer>
              {requestStatus.error && <ErrorMessage>{requestStatus.error}</ErrorMessage>}
          </ErrorMessageContainer>
          </AddressesFormikForm>
        )}
      </Formik>

      <AddressListContainer>
        <h3>Endereços cadastrados</h3>

        {addresses.map((address) => (
          <AddressListItem key={`address-${address.id_endereco}`}>
            <span>
              <HiOutlineLocationMarker size={40} color={PINK} />
            </span>
            <AddresData>
              <p>{getFormattedAddressText(address)}</p>
              {address.complemento && <p>{`Complemento: ${address.complemento}`}</p>}
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
          </AddressListItem>
        ))}
      </AddressListContainer>
    </PageContainer>
  );
};

export default Addresses;
