import Axios from "@api";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Formik, Form } from "formik";
import { getGeneralDataArg } from "./Submit";
import { ERROR_RED } from "@utils/colors";
import { maskDate } from "@utils/formatters";
import { PageContainer, PageTitle } from "@components/shared";
import { phoneNumberChangeHandler } from "@utils/formatters";
import { CustomTextField, InputTextFormik } from "@components/shared";
import { ErrorMessage, SuccessMessage } from "@components/shared/StyledComponents";
import {
  getGeneralDataFormModel,
  getGeneralDataInitialValues,
  getGeneralDataValidationSchema,
} from "./FormModel";
import {
  NumberOrders,
  GeneralDataContainer,
  CustomTextFieldSmallerContainer,
} from "./styled";

import type { AxiosError } from "axios";
import type { MyUser } from "@my-types/next-auth";
import type { GeneralDataValues } from "./FormModel";
import type { SetFieldValue } from "@my-types/formik";
import type { RequestState } from "@my-types/request";
import type { UserGeneralData } from "@models/usuario";

type GeneralDataProps = {
  user: MyUser;
  userGeneralData: UserGeneralData;
};

const GeneralData: React.FC<GeneralDataProps> = ({ user, userGeneralData }) => {
  const formModel = getGeneralDataFormModel();
  const [submitRequestState, setSubmitRequestState] = useState<RequestState>({
    error: "",
    isLoading: false,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const validationSchema = getGeneralDataValidationSchema(formModel);
  const initialValues = getGeneralDataInitialValues(userGeneralData);

  function phoneInputChangeHandler(
    values: GeneralDataValues,
    setFieldValue: SetFieldValue<GeneralDataValues>,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const formatedPhoneInput = phoneNumberChangeHandler(event.target.value, values.telefone);
    setFieldValue(formModel.telefone.name, formatedPhoneInput);
  }

  function dateInputChangeHandler(
    setFieldValue: SetFieldValue<GeneralDataValues>,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const formatedDate = maskDate(event.target.value);
    setFieldValue(formModel.data_nascimento.name, formatedDate);
  }

  async function generalDataSubmitHandler(values: GeneralDataValues) {
    setSubmitRequestState({ error: "", isLoading: true });
    setSuccessMessage("");
    try {
      const generalDataArg = getGeneralDataArg(values);
      await Axios.put(`/users/general-data/${user.id_usuario}`, generalDataArg);
      setSubmitRequestState({ error: "", isLoading: false });
      setSuccessMessage("Dados atualizados com sucesso!");
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      if (error.response)
        return setSubmitRequestState({ error: error.response.data.message, isLoading: false });
      setSubmitRequestState({ error: "Aconteceu algum problema!", isLoading: false });
    }
  }

  return (
    <PageContainer>
      <PageTitle>Dados gerais</PageTitle>
      <Formik
        validateOnBlur
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={generalDataSubmitHandler}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <GeneralDataContainer>
              <NumberOrders>
                <h3>{userGeneralData.count_pedido}</h3>
                <p>pedidos</p>
              </NumberOrders>
              <InputTextFormik
                fullWidth
                autoComplete="off"
                variant="outlined"
                value={values.nome}
                name={formModel.nome.name}
                label={`${formModel.nome.label} *`}
              />
              <CustomTextFieldSmallerContainer>
                <InputTextFormik
                  fullWidth
                  autoComplete="off"
                  variant="outlined"
                  value={values.data_nascimento}
                  name={formModel.data_nascimento.name}
                  label={`${formModel.data_nascimento.label} *`}
                  onChange={dateInputChangeHandler.bind(null, setFieldValue)}
                />
                <InputTextFormik
                  fullWidth
                  autoComplete="off"
                  variant="outlined"
                  value={values.telefone}
                  name={formModel.telefone.name}
                  label={`${formModel.telefone.label} *`}
                  onChange={phoneInputChangeHandler.bind(null, values, setFieldValue)}
                />
              </CustomTextFieldSmallerContainer>
              <CustomTextField
                label="Email"
                variant="outlined"
                value={userGeneralData.email}
                fullWidth
                autoComplete="off"
                disabled
              />
              <Button
                size="large"
                variant="contained"
                color="secondary"
                type="submit"
                disabled={submitRequestState.isLoading === true}
                startIcon={
                  <>
                    {submitRequestState.isLoading && <CircularProgress size={20} color="primary" />}
                  </>
                }
              >
                Salvar alterações
              </Button>
              {submitRequestState.error && (
                <ErrorMessage style={{ color: ERROR_RED }}>{submitRequestState.error}</ErrorMessage>
              )}
              {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
            </GeneralDataContainer>
          </Form>
        )}
      </Formik>
    </PageContainer>
  );
};

export default GeneralData;
