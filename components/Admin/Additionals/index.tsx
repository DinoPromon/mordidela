import React, { Fragment, useCallback, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import { FaTrash } from "react-icons/fa/index";
import { BsPencil } from "react-icons/bs/index";

import Axios from "@api";
import useRequestState from "@hooks/useRequestState";
import { InputTextFormik, LoadingButton } from "@components/shared";

import {
  getAdditionalFormInitialValues,
  getAdditionalFormValidationSchema,
  getAdditionalFormModel,
} from "./FormModel";

import { InputAdditionalContainer } from "./styled";

import {
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from "@material-ui/core";

import {
  ProductsComponentsTitle,
  ProductsComponentsContainer,
  AddProductsComponentsTitle,
  ProductsComponentsButtonContainer,
  ProductsComponentsIcons,
  LoadingContainer,
  TableTitle,
} from "@components/shared/ProductsComponents";

const Additionals: React.FC = () => {
  const formModel = getAdditionalFormModel();
  const [requestStatus, changeRequestStatus] = useRequestState({ error: "", isLoading: true });

  const useStyles = makeStyles({
    table: {
      minWidth: 600,
    },
  });

  const classes = useStyles();

  return (
    <ProductsComponentsContainer>
      <ProductsComponentsTitle>Adicionais</ProductsComponentsTitle>

      <Formik
        enableReinitialize
        validateOnChange={false}
        validationSchema={getAdditionalFormValidationSchema(formModel)}
        initialValues={getAdditionalFormInitialValues()}
        onSubmit={console.log}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <AddProductsComponentsTitle>Criar adicional</AddProductsComponentsTitle>
            <InputAdditionalContainer>
              <InputTextFormik
                name={formModel.name.name}
                label={formModel.name.label}
                values={values.name}
                variant="outlined"
                helperText={formModel.name.requiredErrorMessage}
                style={{ width: "454px" }}
                autoComplete="off"
              />
              <InputTextFormik
                name={formModel.value.name}
                label={formModel.value.label}
                values={values.value}
                variant="outlined"
                helperText={formModel.value.requiredErrorMessage}
                style={{ width: "130px" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
                autoComplete="off"
              />
            </InputAdditionalContainer>
            <ProductsComponentsButtonContainer>
              <Button type="button" color="secondary" variant="outlined">
                Cancelar
              </Button>
              <motion.div layout>
                <LoadingButton
                  type="submit"
                  color="secondary"
                  variant="contained"
                  isLoading={isSubmitting}
                >
                  Adicionar
                </LoadingButton>
              </motion.div>
            </ProductsComponentsButtonContainer>
          </Form>
        )}
      </Formik>

      <Fragment>
        <div>
          <TableTitle>
            <h3>Todos os adicionais</h3>
            <FormControlLabel control={<Checkbox />} label="Exibir os adicionais excluídos" />
          </TableTitle>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <b>Adicional</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Valor (em R$)</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Status</b>
                  </TableCell>
                  <TableCell>
                    <b>Ações</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              {/*                 <TableBody>
                  {flavors.map((flavor) => (
                    <TableRow key={flavor.id_sabor}>
                      <TableCell>{flavor.nome}</TableCell>
                      {flavor.deletado === false ? (
                        <TableCell align="center">Disponível</TableCell>
                      ) : (
                        <TableCell align="center">Excluído</TableCell>
                      )}
                      <TableCell>
                        <ProductsComponentsIcons>
                          <ClickableItem
                            scale={1.3}
                            title="Editar sabor"
                            onClick={() => editFlavorHandler(flavor)}
                          >
                            <BsPencil size={16} color={PINK} />
                          </ClickableItem>
                          <ClickableItem
                            title="Excluir sabor"
                            scale={1.3}
                            onClick={() => deleteFlavorHandler(flavor)}
                          >
                            <FaTrash size={16} color={PINK} />
                          </ClickableItem>
                        </ProductsComponentsIcons>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
            </Table>
          </TableContainer>
        </div>
        {requestStatus.isLoading && (
          <LoadingContainer>
            <CircularProgress size={30} color="primary" />
          </LoadingContainer>
        )}
      </Fragment>
    </ProductsComponentsContainer>
  );
};

export default Additionals;
