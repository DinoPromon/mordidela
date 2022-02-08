import Axios from "@api";
import React from "react";
import Button from "@material-ui/core/Button";
import { Formik, Form } from "formik";
import { getGeneralDataArg } from "./Submit";
import { maskDate } from "@utils/formatters";
import { MyUser } from "@my-types/next-auth";
import { SetFieldValue } from "@my-types/formik";
import { UserGeneralData } from "@models/usuario";
import { PageContainer } from "@components/shared";
import { phoneNumberChangeHandler } from "@utils/formatters";
import { CustomTextField, InputTextFormik } from "@components/shared";
import {
  GeneralDataValues,
  getGeneralDataFormModel,
  getGeneralDataInitialValues,
  getGeneralDataValidationSchema,
} from "./FormModel";
import {
  NumberOrders,
  GeneralDataTitle,
  GeneralDataContainer,
  CustomTextFieldSmallerContainer,
} from "./styled";

type GeneralDataProps = {
  user: MyUser;
  userGeneralData: UserGeneralData;
};

const GeneralData: React.FC<GeneralDataProps> = ({ user, userGeneralData }) => {
  const formModel = getGeneralDataFormModel();
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
    try {
      const generalDataArg = getGeneralDataArg(values);
      console.log(generalDataArg);
      await Axios.put(`/users/general-data/${user.id_usuario}`, generalDataArg);
    } catch (e) {
      const error = e as Error;
      console.log(error.message);
    }
  }

  return (
    <PageContainer>
      <GeneralDataTitle>Dados gerais</GeneralDataTitle>
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
              <Button size="large" variant="contained" color="secondary" type="submit">
                Salvar alterações
              </Button>
            </GeneralDataContainer>
          </Form>
        )}
      </Formik>
    </PageContainer>
  );
};

export default GeneralData;
