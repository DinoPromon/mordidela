import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import { motion } from "framer-motion";
import { getSession } from "next-auth/client";
import { FaTrash } from "react-icons/fa/index";
import { BsPencil } from "react-icons/bs/index";
import { HiOutlineLocationMarker } from "react-icons/hi/index";
import { ErrorMessage } from "@components/shared/StyledComponents";

import Axios from "@api";
import useRequestState from "@hooks/useRequestState";
import LoadingButton from "@components/shared/LoadingButton";
import ClickableItem from "@components/shared/ClickableItem";
import CustomAnimatePresence from "@components/shared/CustomAnimatePresence";
import { PINK, PURPLE } from "@utils/colors";
import { InputTextFormik } from "@components/shared";
import { PageContainer, PageTitle } from "@components/shared";
import { ErrorMessageContainer } from "@components/Login/LoginForm/styled";

import { getAddressFormArg } from "./Submit";
import {
  getAddressesFormModel,
  getAddressesFormInitialValues,
  getAddressesFormValidationSchema,
  IAddressesFormValues,
} from "./FormModel";
import {
  AddresData,
  AddresIcons,
  AddressListItem,
  CustomInputsDesign,
  AddressesFormikForm,
  AddressListContainer,
  AddressesFormButtonContainer,
} from "./styled";

import type IEndereco from "@models/endereco";

type AddressesProps = {
  addresses: IEndereco[];
};

const Addresses: React.FC<AddressesProps> = ({ addresses }) => {
  const formModel = getAddressesFormModel();
  const [initialValues, setInitialValues] = useState(getAddressesFormInitialValues());
  const { requestStatus, changeRequestStatus } = useRequestState();
  const [editAddressId, setEditAddressId] = useState<number>();

  function getFormattedAddressText(address: IEndereco) {
    return `${address.logradouro} N° ${address.numero}, ${address.bairro}`;
  }

  async function addressFormSubmitHandler(values: IAddressesFormValues) {
    changeRequestStatus({ error: "", isLoading: true });
    try {
      const addressesFormArg = getAddressFormArg(values);
      const session = await getSession();
      if (!session) return;

      await Axios.post(`address/${session.user.id_usuario}`, addressesFormArg);
    } catch (e) {
      const error = e as Error;
      changeRequestStatus({ error: error.message });
    }
    changeRequestStatus({ isLoading: false });
  }

  function setAddressToEdit(address: IEndereco) {
    return () => {
      setInitialValues(getAddressesFormInitialValues(address));
      setEditAddressId(address.id_endereco);
    };
  }

  function cancelClickHandler() {
    setEditAddressId(undefined);
    setInitialValues(getAddressesFormInitialValues());
  }

  return (
    <PageContainer>
      <PageTitle>Endereços</PageTitle>
      <Formik
        validateOnMount
        enableReinitialize
        validateOnChange={false}
        validationSchema={getAddressesFormValidationSchema(formModel)}
        initialValues={initialValues}
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
            <AddressesFormButtonContainer isEdit={Boolean(editAddressId)}>
              <CustomAnimatePresence>
                {Boolean(editAddressId) && (
                  <motion.div
                    key="cancel-buton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Button
                      size="large"
                      color="secondary"
                      variant="contained"
                      onClick={cancelClickHandler}
                    >
                      Cancelar
                    </Button>
                  </motion.div>
                )}
              </CustomAnimatePresence>
              <motion.div layout layoutId="submit-button">
                <LoadingButton
                  size="large"
                  type="submit"
                  color="secondary"
                  variant="contained"
                  isLoading={requestStatus.isLoading}
                  disabled={!(isValid && dirty) || requestStatus.isLoading}
                >
                  {Boolean(editAddressId) ? "Salvar alterações" : "Adicionar endereço"}
                </LoadingButton>
              </motion.div>
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
              <ClickableItem
                scale={1.25}
                placement="bottom"
                title="Editar endereço"
                onClick={setAddressToEdit(address)}
              >
                <BsPencil size={20} color={PURPLE} />
              </ClickableItem>
              <ClickableItem title="Editar endereço" placement="bottom" scale={1.25}>
                <FaTrash size={20} color={PURPLE} />
              </ClickableItem>
            </AddresIcons>
          </AddressListItem>
        ))}
      </AddressListContainer>
    </PageContainer>
  );
};

export default Addresses;
