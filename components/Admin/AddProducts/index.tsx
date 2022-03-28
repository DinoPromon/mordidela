import { Formik } from "formik";
import React, { Fragment } from "react";
import { AddProductsContainer, AddProductsTitle, AddProductsRowContainer } from "./styled";

import {
  getProductsFormInitialValues,
  getProductsFormValidationSchema,
  getProductsFormModel,
} from "./FormModel";

import { InputTextFormik } from "@components/shared";
import { FormikForm } from "@components/Login/styled";
import { InputAdornment, RadioGroup } from "@material-ui/core";

const AddProducts: React.FC = () => {
  const formModel = getProductsFormModel();
  return (
    <Fragment>
      <Formik
        enableReinitialize
        validateOnChange={false}
        validationSchema={getProductsFormValidationSchema(formModel)}
        initialValues={getProductsFormInitialValues()}
        onSubmit={console.log}
      >
        {({ values }) => (
          <AddProductsContainer>
            <AddProductsTitle>Adicionar produto</AddProductsTitle>
            <FormikForm>
              <InputTextFormik
                name={formModel.name.name}
                label={formModel.name.label}
                values={values.name}
                variant="outlined"
                helperText={formModel.name.requiredErrorMessage}
                style={{ width: "600px" }}
                autoComplete="off"
              />
              <AddProductsRowContainer>
                <InputTextFormik
                  name={formModel.defaultPrice.name}
                  label={formModel.defaultPrice.label}
                  values={values.defaultPrice}
                  variant="outlined"
                  helperText={formModel.defaultPrice.requiredErrorMessage}
                  style={{ width: "130px" }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                  autoComplete="off"
                />
                <InputTextFormik
                  name={formModel.size.name}
                  label={formModel.size.label}
                  values={values.size}
                  variant="outlined"
                  helperText={formModel.size.requiredErrorMessage}
                  style={{ width: "280px" }}
                  autoComplete="off"
                />

                <InputTextFormik
                  name={formModel.available.name}
                  label={formModel.available.label}
                  values={values.available}
                  variant="outlined"
                  helperText={formModel.available.requiredErrorMessage}
                  style={{ width: "150px" }}
                  autoComplete="off"
                  select
                />
              </AddProductsRowContainer>
              <InputTextFormik
                name={formModel.description.name}
                label={formModel.description.label}
                values={values.description}
                variant="outlined"
                helperText={formModel.description.requiredErrorMessage}
                style={{ width: "600px" }}
                autoComplete="off"
              />
              <InputTextFormik
                name={formModel.image.name}
                label={formModel.image.label}
                values={values.image}
                variant="outlined"
                helperText={formModel.image.requiredErrorMessage}
                style={{ width: "600px" }}
                autoComplete="off"
                type="file"
              />
              <AddProductsRowContainer>
                <h4>O produto possui sabores?</h4>
                <RadioGroup></RadioGroup>
              </AddProductsRowContainer>
            </FormikForm>
          </AddProductsContainer>
        )}
      </Formik>
    </Fragment>
  );
};

export default AddProducts;
