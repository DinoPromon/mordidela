import React, { Fragment, useRef } from "react";
import { Formik } from "formik";
import {
  Select,
  Button,
  MenuItem,
  RadioGroup,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@material-ui/core";

import Axios from "@api";
import { formatCurrency } from "@utils/formatters";
import { transformPriceStringToNumber } from "@utils/transformation";
import { InputTextFormik, CustomTextField, LoadingButton } from "@components/shared";

import { ProductAvailable } from "./utility/constants";
import {
  ProductForm,
  AddProductsTitle,
  ProductImageInput,
  AddProductsContainer,
  AddProductsRowContainer,
  ProductFormActionsContainer,
} from "./styled";

import {
  getProductsFormInitialValues,
  getProductsFormValidationSchema,
  getProductsFormModel,
} from "./FormModel";

import type { AxiosError } from "axios";
import type { FormikHelpers } from "formik";
import type { SetProductValue, IProductsFormValues } from "./FormModel";

const AddProducts: React.FC = () => {
  const formModel = getProductsFormModel();
  const imageRef = useRef<HTMLInputElement>(null);

  function getDefaultPriceChangeHandler(setFieldValue: SetProductValue) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue("defaultPrice", event.target.value && formatCurrency(event.target.value));
    };
  }

  function openFileSearch() {
    if (!imageRef.current) return;

    imageRef.current.click();
  }

  function getFileChangeHandler(setFieldValue: SetProductValue) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;

      setFieldValue("image", event.target.files.item(0) || undefined);
    };
  }

  async function submitHandler(
    values: IProductsFormValues,
    formikHelpers: FormikHelpers<IProductsFormValues>
  ) {
    const formValues = new FormData();

    formValues.append("nome", values.name);
    formValues.append("preco_padrao", String(transformPriceStringToNumber(values.defaultPrice)));
    formValues.append("disponivel", values.available);
    formValues.append("tamanho", values.size);
    formValues.append("descricao", values.description);
    formValues.append("qtde_max_sabor", values.maxFlavors);
    if (values.image) formValues.append("imagem", values.image);

    try {
      const response = await Axios.post("products", formValues);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data.message);
      return;
    }

    formikHelpers.resetForm();
  }

  return (
    <AddProductsContainer>
      <Formik
        enableReinitialize
        validateOnChange={false}
        validationSchema={getProductsFormValidationSchema(formModel)}
        initialValues={getProductsFormInitialValues()}
        onSubmit={submitHandler}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <ProductForm>
            <AddProductsTitle>Adicionar produto</AddProductsTitle>
            <InputTextFormik
              name={formModel.name.name}
              label={formModel.name.label}
              variant="outlined"
              helperText={formModel.name.requiredErrorMessage}
              autoComplete="off"
              fullWidth
            />
            <InputTextFormik
              name={formModel.size.name}
              label={formModel.size.label}
              variant="outlined"
              helperText={formModel.size.requiredErrorMessage}
              autoComplete="off"
              fullWidth
            />
            <AddProductsRowContainer>
              <InputTextFormik
                name={formModel.defaultPrice.name}
                label={formModel.defaultPrice.label}
                variant="outlined"
                helperText={formModel.defaultPrice.requiredErrorMessage}
                onChange={getDefaultPriceChangeHandler(setFieldValue)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
                autoComplete="off"
              />
              <InputTextFormik
                name={formModel.maxFlavors.name}
                label={formModel.maxFlavors.label}
                variant="outlined"
                helperText={formModel.maxFlavors.requiredErrorMessage}
                autoComplete="off"
                fullWidth
              />

              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor={formModel.available.name}>
                  {formModel.available.label}
                </InputLabel>
                <Select
                  id={formModel.available.name}
                  name={formModel.available.name}
                  value={values.available}
                  label={formModel.available.label}
                  onChange={(event) => setFieldValue(formModel.available.name, event.target.value)}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    getContentAnchorEl: null,
                  }}
                >
                  <MenuItem value={ProductAvailable.TRUE}>Sim</MenuItem>
                  <MenuItem value={ProductAvailable.FALSE}>Não</MenuItem>
                </Select>
              </FormControl>
            </AddProductsRowContainer>
            <AddProductsRowContainer>
              <InputTextFormik
                name={formModel.description.name}
                label={formModel.description.label}
                variant="outlined"
                helperText={formModel.description.requiredErrorMessage}
                autoComplete="off"
                fullWidth
              />
              <ProductImageInput
                type="file"
                accept="image/*"
                ref={imageRef}
                onChange={getFileChangeHandler(setFieldValue)}
              />

              <CustomTextField
                label={formModel.image.label}
                value={values.image ? values.image.name : ""}
                variant="outlined"
                autoComplete="off"
                fullWidth
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Button color="primary" variant="contained" onClick={openFileSearch}>
                        Procurar
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </AddProductsRowContainer>
            <AddProductsRowContainer>
              <h4>O produto possui sabores?</h4>
              <RadioGroup></RadioGroup>
            </AddProductsRowContainer>
            <ProductFormActionsContainer>
              <LoadingButton
                type="submit"
                color="primary"
                variant="contained"
                isLoading={isSubmitting}
              >
                Adicionar
              </LoadingButton>
            </ProductFormActionsContainer>
          </ProductForm>
        )}
      </Formik>
    </AddProductsContainer>
  );
};

export default AddProducts;
