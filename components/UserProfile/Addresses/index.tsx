import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import { motion } from "framer-motion";
import { getSession, session } from "next-auth/client";
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
import { SuccessMessage } from "@components/shared/StyledComponents";
import { ErrorMessageContainer } from "@components/Login/LoginForm/styled";

import { getAddressFormArg, getUpdateAddressFormArg } from "./Submit";
import {
  getAddressesFormModel,
  getAddressesFormInitialValues,
  getAddressesFormValidationSchema,
  IAddressesFormValues,
} from "./FormModel";
import {
  AddressData,
  AddressIcons,
  AddressListItem,
  CustomInputsDesign,
  AddressesFormikForm,
  AddressListContainer,
  SuccessMessageContainer,
  AddressesFormButtonContainer,
} from "./styled";

import type { AxiosError } from "axios";
import type { FormikHelpers } from "formik";
import type IEndereco from "@models/endereco";

type AddressesProps = {
  addresses: IEndereco[];
};

const Addresses: React.FC<AddressesProps> = ({ addresses }) => {
  const formModel = getAddressesFormModel();
  const [addressList, setAddressList] = useState(addresses);
  const [initialValues, setInitialValues] = useState(getAddressesFormInitialValues());
  const { requestStatus, changeRequestStatus } = useRequestState();
  const [editSuccess, setEditSuccess] = useState(false);
  const [submitSuccess, setSubmitSucess] = useState(false);
  const [editAddressId, setEditAddressId] = useState<number>();

  function getFormattedAddressText(address: IEndereco) {
    return `${address.logradouro} N° ${address.numero}, ${address.bairro}`;
  }

  function changeAddressInList(editAddressId: number, values: IAddressesFormValues) {
    setAddressList((prevState) => {
      const addressIndex = prevState.findIndex((address) => address.id_endereco === editAddressId);
      if (addressIndex < 0) return prevState;

      const newAddressList = [...prevState];
      newAddressList.splice(addressIndex, 1, {
        ...prevState[addressIndex],
        bairro: values.neighborhood,
        complemento: values.complement ? values.complement : null,
        logradouro: values.publicPlace,
        numero: values.number,
      });

      return newAddressList;
    });
  }

  function getDeleteAddressHandler(address: IEndereco) {
    return async () => {
      const session = await getSession().catch((err) => console.log(err));
      if (!session) return;

      try {
        const response = await Axios.put<IEndereco>(`/address/delete/${address.id_endereco}`);

        setAddressList((prevState) =>
          prevState.filter((listAddress) => listAddress.id_endereco !== response.data.id_endereco)
        );
      } catch (err) {
        const error = err as AxiosError;
        console.log(error.response?.data.message);
      }
    };
  }

  function getAddressEditClickHandler(address: IEndereco) {
    return () => {
      setInitialValues(getAddressesFormInitialValues(address));
      setEditAddressId(address.id_endereco);
    };
  }

  function cancelClickHandler() {
    setEditAddressId(undefined);
    setInitialValues(getAddressesFormInitialValues());
  }

  async function editAddressSubmitHandler(editAddressId: number, values: IAddressesFormValues) {
    const addressFormArg = getUpdateAddressFormArg(initialValues, values);

    await Axios.put<IEndereco>(`/address/update/${editAddressId}`, addressFormArg);

    setEditSuccess(true);
    setEditAddressId(undefined);
    changeAddressInList(editAddressId, values);
    setInitialValues(getAddressesFormInitialValues());
  }

  async function createAddressSubmitHandler(
    userId: number,
    values: IAddressesFormValues,
    formikHelpers: FormikHelpers<IAddressesFormValues>
  ) {
    const addressesFormArg = getAddressFormArg(values);

    const response = await Axios.post<IEndereco>(`/address/${userId}`, addressesFormArg);

    setAddressList((prevState) => [...prevState, response.data]);
    formikHelpers.resetForm();
  }

  async function addressFormSubmitHandler(
    values: IAddressesFormValues,
    formikHelpers: FormikHelpers<IAddressesFormValues>
  ) {
    changeRequestStatus({ error: "", isLoading: true });
    setEditSuccess(false);

    try {
      const session = await getSession();
      if (!session) return;

      if (editAddressId) {
        await editAddressSubmitHandler(editAddressId, values);
      } else {
        await createAddressSubmitHandler(session.user.id_usuario, values, formikHelpers);
        setSubmitSucess(true);
      }
    } catch (e) {
      const error = e as AxiosError;
      changeRequestStatus({ error: error.response?.data.message });
    }

    changeRequestStatus({ isLoading: false });
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
        {({ values, isValid, dirty, isSubmitting }) => (
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
                      disabled={isSubmitting}
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
            {submitSuccess && (
              <SuccessMessageContainer>
                <SuccessMessage>Endereço criado com sucesso</SuccessMessage>
              </SuccessMessageContainer>
            )}
            {editSuccess && (
              <SuccessMessageContainer>
                <SuccessMessage>Editado com sucesso</SuccessMessage>
              </SuccessMessageContainer>
            )}
            <ErrorMessageContainer>
              {requestStatus.error && <ErrorMessage>{requestStatus.error}</ErrorMessage>}
            </ErrorMessageContainer>
          </AddressesFormikForm>
        )}
      </Formik>

      <AddressListContainer>
        <h3>Endereços cadastrados</h3>

        {addressList.map((address) => (
          <AddressListItem key={`address-${address.id_endereco}`}>
            <span>
              <HiOutlineLocationMarker size={40} color={PINK} />
            </span>
            <AddressData>
              <p>{getFormattedAddressText(address)}</p>
              {address.complemento && <p>{`Complemento: ${address.complemento}`}</p>}
            </AddressData>
            <AddressIcons>
              <ClickableItem
                scale={1.25}
                placement="bottom"
                title="Editar endereço"
                onClick={getAddressEditClickHandler(address)}
              >
                <BsPencil size={20} color={PURPLE} />
              </ClickableItem>
              <ClickableItem
                title="Excluir endereço"
                placement="bottom"
                scale={1.25}
                onClick={getDeleteAddressHandler(address)}
              >
                <FaTrash size={20} color={PURPLE} />
              </ClickableItem>
            </AddressIcons>
          </AddressListItem>
        ))}
      </AddressListContainer>
    </PageContainer>
  );
};

export default Addresses;
