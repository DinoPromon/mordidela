import React, { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import { motion } from "framer-motion";
import { getSession } from "next-auth/client";
import { ErrorMessage } from "@components/shared/StyledComponents";

import Axios from "@api";
import useRequestState from "@hooks/useRequestState";
import LoadingButton from "@components/shared/LoadingButton";
import CustomAnimatePresence from "@components/shared/CustomAnimatePresence";
import { InputTextFormik } from "@components/shared";
import { ErrorMessageContainer } from "@components/Login/LoginForm/styled";
import { PageContainer, PageTitle } from "@components/shared";

import AddressesList from "./AddressesList";
import AddressesModal from "./AddressesModal";
import AddressFormRequestSuccess from "./AddressFormRequestSuccess";
import { DeleteStep, FormRequestSuccess } from "./constants";
import { getAddressFormArg, getUpdateAddressFormArg } from "./Submit";
import {
  getAddressesFormModel,
  getAddressesFormInitialValues,
  getAddressesFormValidationSchema,
  IAddressesFormValues,
} from "./FormModel";
import {
  CustomInputsDesign,
  AddressesFormikForm,
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
  const [deleteStep, setDeleteStep] = useState<DeleteStep | null>(null);
  const [requestStatus, changeRequestStatus] = useRequestState();
  const [formRequestSuccess, setFormRequestSuccess] = useState<FormRequestSuccess | null>(null);
  const [editAddressId, setEditAddressId] = useState<number>();
  const [selectedDeleteAddress, setSelectedDeleteAddress] = useState<IEndereco>();
  const [initialValues, setInitialValues] = useState(getAddressesFormInitialValues());

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

  function cancelClickHandler() {
    setEditAddressId(undefined);
    setInitialValues(getAddressesFormInitialValues());
  }

  async function editAddressSubmitHandler(editAddressId: number, values: IAddressesFormValues) {
    const addressFormArg = getUpdateAddressFormArg(initialValues, values);
    setFormRequestSuccess(null);

    try {
      await Axios.put<IEndereco>(`/address/update/${editAddressId}`, addressFormArg);

      setFormRequestSuccess(FormRequestSuccess.EDIT);
      setEditAddressId(undefined);
      changeAddressInList(editAddressId, values);
      setInitialValues(getAddressesFormInitialValues());
    } catch (err) {
      const error = err as AxiosError;
      console.log(err);
      changeRequestStatus({ error: error.response?.data.message });
    }
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
    setFormRequestSuccess(null);

    try {
      const session = await getSession();
      if (!session) return;

      if (editAddressId) {
        await editAddressSubmitHandler(editAddressId, values);
      } else {
        await createAddressSubmitHandler(session.user.id_usuario, values, formikHelpers);
        setFormRequestSuccess(FormRequestSuccess.CREATE);
      }
    } catch (e) {
      const error = e as AxiosError;
      changeRequestStatus({ error: error.response?.data.message });
    }

    changeRequestStatus({ isLoading: false });
  }

  function closeModalHandler() {
    setDeleteStep(null);
  }

  async function deleteAddressHandler() {
    if (!selectedDeleteAddress) return;

    const session = await getSession().catch((err) => console.log(err));
    if (!session) return;

    setFormRequestSuccess(null);
    setDeleteStep(DeleteStep.DELETING);
    changeRequestStatus({ isLoading: true });

    try {
      const response = await Axios.put<IEndereco>(
        `/address/delete/${selectedDeleteAddress.id_endereco}`
      );

      setAddressList((prevState) =>
        prevState.filter((listAddress) => listAddress.id_endereco !== response.data.id_endereco)
      );
    } catch (err) {
      const error = err as AxiosError;
      changeRequestStatus({ error: error.response?.data.message });
      console.log(error.response?.data.message);
    }

    setDeleteStep(DeleteStep.DELETED);
    changeRequestStatus({ isLoading: false });
  }

  const editAddressClickHandler = useCallback((address: IEndereco) => {
    setInitialValues(getAddressesFormInitialValues(address));
    setEditAddressId(address.id_endereco);
  }, []);

  const deleteAddressClickHandler = useCallback((address: IEndereco) => {
    setDeleteStep(DeleteStep.CONFIRMATION);
    setSelectedDeleteAddress(address);
  }, []);

  return (
    <PageContainer>
      <AddressesModal
        deleteStep={deleteStep}
        onDeleteAddress={deleteAddressHandler}
        onCloseModal={closeModalHandler}
      />
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

            <AddressFormRequestSuccess requestSuccess={formRequestSuccess} />

            <ErrorMessageContainer>
              {requestStatus.error && <ErrorMessage>{requestStatus.error}</ErrorMessage>}
            </ErrorMessageContainer>
          </AddressesFormikForm>
        )}
      </Formik>

      <AddressesList
        addresses={addressList}
        onEditClick={editAddressClickHandler}
        onDeleteClick={deleteAddressClickHandler}
      />
    </PageContainer>
  );
};

export default Addresses;
