import React, { Fragment, useCallback, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import { FaTrash } from "react-icons/fa/index";
import { BsPencil } from "react-icons/bs/index";
import {
  Table,
  Paper,
  Checkbox,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  FormControl,
  TableContainer,
  InputAdornment,
  TablePagination,
  FormControlLabel,
} from "@material-ui/core";

import Axios from "@api";
import useIsMounted from "@hooks/useIsMounted";
import useRequestState from "@hooks/useRequestState";
import ClickableItem from "@components/shared/ClickableItem";
import { PINK } from "@utils/colors";
import { GetDeleted } from "@utils/constants";
import { formatCurrency } from "@utils/formatters";
import { useTablePagination } from "@hooks/useTablePagination";
import { transformPriceStringToNumber, transformPriceToString } from "@utils/transformation";
import { InputTextFormik, LoadingButton, CustomChip } from "@components/shared";
import {
  TableTitle,
  useTableStyles,
  LoadingContainer,
  CustomTableContainer,
  ProductsComponentsTitle,
  ProductsComponentsIcons,
  AddProductsComponentsTitle,
  ProductsComponentsContainer,
  ProductsComponentsButtonContainer,
} from "@components/shared/ProductsComponents";

import {
  getAdditionalFormModel,
  getAdditionalFormInitialValues,
  getAdditionalFormValidationSchema,
} from "./FormModel";
import { InputAdditionalContainer } from "./styled";

import type { AxiosError } from "axios";
import type { FormikHelpers } from "formik";
import type IAdicional from "@models/adicional";
import type { FindAllAdditionalsResponse } from "@my-types/responses";
import type { IAdditionalFormValues, SetAdditionalFormValue } from "./FormModel";

type FetchAddsParams = {
  getDeleted: GetDeleted;
  skip: number;
  itemsAmount?: number;
};

type AddsData = {
  count: number;
  items: IAdicional[];
};

const Additionals: React.FC = () => {
  const tableClasses = useTableStyles();
  const isMounted = useIsMounted();
  const [pagination, skip, changePage, changeItemsAmount] = useTablePagination();
  const [requestStatus, changeRequestStatus] = useRequestState({ error: "", isLoading: true });
  const [adds, setAdds] = useState<AddsData>();
  const [editAdd, setEditAdd] = useState<IAdicional>();
  const [deletingFlavor, setDeletingFlavor] = useState<IAdicional>();
  const [getDeleted, setGetDeleted] = useState<GetDeleted>(GetDeleted.FALSE);

  const formModel = getAdditionalFormModel();
  const itemsAmountOptions = [5, 10, 15];

  function updateAdd(add: IAdicional) {
    setAdds((prevState) => {
      if (!prevState) return prevState;

      const index = prevState.items.findIndex((padd) => padd.id_adicional === add.id_adicional);

      if (index <= -1) return prevState;

      const newFlavors = [...prevState.items];
      newFlavors[index] = add;

      return {
        ...prevState,
        items: newFlavors,
      };
    });
  }

  function editFlavorHandler(flavor: IAdicional) {
    setEditAdd(flavor);
  }

  function cancelHandler() {
    setEditAdd(undefined);
  }

  function priceChangeHandler(
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: SetAdditionalFormValue
  ) {
    setFieldValue("price", event.target.value && formatCurrency(event.target.value));
  }

  async function submitHandler(
    values: IAdditionalFormValues,
    formikHelpers: FormikHelpers<IAdditionalFormValues>
  ) {
    try {
      if (editAdd) {
        const response = await Axios.put<IAdicional>(`/additional/update/${editAdd.id_adicional}`, {
          nome: values.name,
          preco: transformPriceStringToNumber(values.price),
        });

        setEditAdd(undefined);
        updateAdd(response.data);
      } else {
        await Axios.post<IAdicional>("/additional/create", {
          nome: values.name,
          preco: transformPriceStringToNumber(values.price),
        });
        fetchAdds({ skip, getDeleted, itemsAmount: pagination.itemsAmount });
      }

      formikHelpers.resetForm();
    } catch (err) {
      const error = err as AxiosError;
      console.log(err);
      changeRequestStatus({ error: error.response?.data.message });
    }
  }

  async function deleteAddHandler(add: IAdicional) {
    setDeletingFlavor(add);
    try {
      await Axios.put<IAdicional>(`/additional/update/${add.id_adicional}`, {
        deletado: true,
      });
      if (!isMounted.current) return;

      fetchAdds({ skip, getDeleted, itemsAmount: pagination.itemsAmount });
    } catch (err) {
      if (!isMounted.current) return;

      const error = err as AxiosError;
      console.log(err);
      changeRequestStatus({ error: error.response?.data.message });
    }
    setDeletingFlavor(undefined);
  }

  const fetchAdds = useCallback(
    async (params: FetchAddsParams) => {
      changeRequestStatus({ isLoading: true });

      try {
        const response = await Axios.get<FindAllAdditionalsResponse>("/additional", {
          params,
        });
        if (!isMounted.current) return;

        setAdds(response.data);
      } catch (err) {
        if (!isMounted.current) return;

        const error = err as AxiosError;
        console.log(err);
        changeRequestStatus({ error: error.response?.data.message });
      }

      changeRequestStatus({ isLoading: false });
    },
    [isMounted, changeRequestStatus]
  );

  useEffect(() => {
    fetchAdds({ skip, getDeleted, itemsAmount: pagination.itemsAmount });
  }, [skip, pagination.itemsAmount, fetchAdds, getDeleted]);

  return (
    <ProductsComponentsContainer>
      <ProductsComponentsTitle>Adicionais</ProductsComponentsTitle>

      <Formik
        enableReinitialize
        validateOnBlur={false}
        onSubmit={submitHandler}
        initialValues={getAdditionalFormInitialValues(editAdd)}
        validationSchema={getAdditionalFormValidationSchema(formModel)}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <AddProductsComponentsTitle>
              {editAdd ? `Editar adicional ${editAdd.nome}` : "Criar adicional"}
            </AddProductsComponentsTitle>
            <InputAdditionalContainer>
              <InputTextFormik
                name={formModel.name.name}
                label={formModel.name.label}
                variant="outlined"
                helperText={formModel.name.requiredErrorMessage}
                style={{ width: "454px" }}
                autoComplete="off"
              />
              <InputTextFormik
                name={formModel.price.name}
                label={formModel.price.label}
                variant="outlined"
                onChange={(event) =>
                  priceChangeHandler(event as React.ChangeEvent<HTMLInputElement>, setFieldValue)
                }
                helperText={formModel.price.requiredErrorMessage}
                style={{ width: "130px" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
                autoComplete="off"
              />
            </InputAdditionalContainer>
            <ProductsComponentsButtonContainer isEdit={!!editAdd}>
              {editAdd && (
                <Button type="button" color="secondary" variant="outlined" onClick={cancelHandler}>
                  Cancelar
                </Button>
              )}

              <motion.div layout>
                <LoadingButton
                  type="submit"
                  color="secondary"
                  variant="contained"
                  isLoading={isSubmitting}
                >
                  {editAdd ? "Editar" : "Adicionar"}
                </LoadingButton>
              </motion.div>
            </ProductsComponentsButtonContainer>
          </Form>
        )}
      </Formik>

      <Fragment>
        <TableTitle>
          <h3>Todos os sabores</h3>
          <FormControl component="fieldset">
            <FormControlLabel
              control={
                <Checkbox
                  checked={getDeleted === GetDeleted.TRUE}
                  onChange={(event, checked) =>
                    setGetDeleted(checked ? GetDeleted.TRUE : GetDeleted.FALSE)
                  }
                />
              }
              label="Exibir os sabores excluídos"
            />
          </FormControl>
        </TableTitle>

        <CustomTableContainer>
          {adds && adds.items.length > 0 && !requestStatus.isLoading && (
            <Fragment>
              <TableContainer component={Paper}>
                <Table classes={tableClasses}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">
                        <b>Sabor</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Preço</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Status</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Ações</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {adds.items.map((add) => (
                      <TableRow key={add.id_adicional}>
                        <TableCell>{add.nome}</TableCell>

                        <TableCell>{transformPriceToString(add.preco)}</TableCell>

                        <TableCell align="center">
                          <CustomChip
                            size="small"
                            color={add.deletado ? "red" : "green"}
                            label={add.deletado ? "Excluído" : "Disponível"}
                          />
                        </TableCell>

                        <TableCell>
                          <ProductsComponentsIcons>
                            <ClickableItem
                              scale={1.3}
                              title="Editar sabor"
                              onClick={() => editFlavorHandler(add)}
                            >
                              <BsPencil size={16} color={PINK} />
                            </ClickableItem>

                            {deletingFlavor && deletingFlavor.id_adicional === add.id_adicional ? (
                              <CircularProgress size={16} color="secondary" />
                            ) : (
                              <ClickableItem
                                title="Excluir sabor"
                                scale={1.3}
                                onClick={() => !deletingFlavor && deleteAddHandler(add)}
                              >
                                <FaTrash size={16} color={PINK} />
                              </ClickableItem>
                            )}
                          </ProductsComponentsIcons>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                labelDisplayedRows={(info) => `${info.to} de ${info.count}`}
                labelRowsPerPage="Linhas por página"
                rowsPerPageOptions={itemsAmountOptions}
                component="div"
                count={adds?.count || 0}
                rowsPerPage={pagination.itemsAmount}
                page={pagination.page}
                onPageChange={(event, page) => !requestStatus.isLoading && changePage(page)}
                onRowsPerPageChange={(event) =>
                  !requestStatus.isLoading && changeItemsAmount(Number(event.target.value))
                }
              />
            </Fragment>
          )}

          {requestStatus.isLoading && (
            <LoadingContainer>
              <CircularProgress size={30} color="primary" />
            </LoadingContainer>
          )}
        </CustomTableContainer>
      </Fragment>
    </ProductsComponentsContainer>
  );
};

export default Additionals;
