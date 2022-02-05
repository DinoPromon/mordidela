import React from "react";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Formik, Form } from "formik";
import { MyUser } from "@my-types/next-auth";
import { UserGeneralData } from "@models/usuario";
import { PageContainer } from "@components/shared";
import { CustomTextField, InputTextFormik } from "@components/shared";
import {
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

  return (
    <PageContainer>
      <GeneralDataTitle>Dados gerais</GeneralDataTitle>
      <Formik
        validateOnBlur
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <GeneralDataContainer>
              <NumberOrders>
                <h3>{userGeneralData.count_pedido}</h3>
                <p>pedidos</p>
              </NumberOrders>
              <InputTextFormik
                required
                fullWidth
                autoComplete="off"
                variant="outlined"
                value={values.nome}
                name={formModel.nome.name}
                label={formModel.nome.label}
              />
              <CustomTextFieldSmallerContainer>
                <InputTextFormik
                  required
                  fullWidth
                  autoComplete="off"
                  variant="outlined"
                  value={values.data_nascimento}
                  name={formModel.data_nascimento.name}
                  label={formModel.data_nascimento.label}
                />
                <InputTextFormik
                  required
                  fullWidth
                  autoComplete="off"
                  variant="outlined"
                  value={values.telefone}
                  name={formModel.telefone.name}
                  label={formModel.telefone.label}
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
              <Button variant="contained" color="secondary" type="submit">
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
