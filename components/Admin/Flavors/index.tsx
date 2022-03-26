import React, { Fragment, useCallback, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import { FaTrash } from "react-icons/fa/index";
import { BsPencil } from "react-icons/bs/index";
import {
  Table,
  Paper,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  CircularProgress,
} from "@material-ui/core";

import Axios from "@api";
import useRequestState from "@hooks/useRequestState";
import ClickableItem from "@components/shared/ClickableItem";
import { PINK } from "@utils/colors";
import { useTablePagination } from "@hooks/useTablePagination";
import { InputTextFormik, LoadingButton } from "@components/shared";
import {
  ProductsComponentsIcons,
  ProductsComponentsTitle,
  AddProductsComponentsTitle,
  ProductsComponentsContainer,
  ProductsComponentsButtonContainer,
} from "@components/shared/ProcutsComponents";

import {
  getFlavorsFormInitialValues,
  getFlavorsFormValidationSchema,
  getFlavorsFormModel,
} from "./FormModel";
import { LoadingContainer, TableTitle, FlavorsTableContainer, useTableStyles } from "./styled";

import type ISabor from "@models/sabor";
import type { AxiosError } from "axios";
import type { IFlavorsFormValues } from "./FormModel";
import type { FindAllFlavorsResponse } from "@my-types/responses/flavor/findAll";

type FetchFlavorsParams = {
  getDeleted: boolean;
  skip: number;
  itemsAmount?: number;
};

type FlavorsData = {
  count: number;
  items: ISabor[];
};

const Flavors: React.FC = () => {
  const tableClasses = useTableStyles();
  const [flavors, setFlavors] = useState<FlavorsData>();
  const [editFlavor, setEditFlavor] = useState<ISabor>();
  const [deletingFlavor, setDeletingFlavor] = useState<ISabor>();
  const [pagination, skip, changePage, changeItemsAmount] = useTablePagination();
  const [requestStatus, changeRequestStatus] = useRequestState({ error: "", isLoading: true });

  const formModel = getFlavorsFormModel();
  const itemsAmountOptions = [5, 10, 15];

  function removeFlavor(flavor: ISabor) {
    setFlavors((prevState) => {
      if (!prevState) return prevState;

      return {
        items: prevState.items.filter((pFlavor) => pFlavor.id_sabor !== flavor.id_sabor),
        count: prevState.count - 1,
      };
    });
  }

  function updateFlavor(flavor: ISabor) {
    setFlavors((prevState) => {
      if (!prevState) return prevState;

      const index = prevState.items.findIndex((pFlavor) => pFlavor.id_sabor === flavor.id_sabor);

      if (index <= -1) return prevState;

      const newFlavors = [...prevState.items];
      newFlavors[index] = flavor;

      return {
        ...prevState,
        items: newFlavors,
      };
    });
  }

  function editFlavorHandler(flavor: ISabor) {
    setEditFlavor(flavor);
  }

  function cancelHandler() {
    setEditFlavor(undefined);
  }

  async function submitHandler(values: IFlavorsFormValues) {
    try {
      if (editFlavor) {
        const response = await Axios.put<ISabor>(`/flavor/update/${editFlavor.id_sabor}`, {
          nome: values.name,
        });

        updateFlavor(response.data);
      } else {
        await Axios.post<ISabor>("/flavor/create", {
          nome: values.name,
        });
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(err);
      changeRequestStatus({ error: error.response?.data.message });
    }
  }

  async function deleteFlavorHandler(flavor: ISabor) {
    setDeletingFlavor(flavor);
    try {
      const response = await Axios.put<ISabor>(`/flavor/update/${flavor.id_sabor}`, {
        deletado: true,
      });

      removeFlavor(response.data);
    } catch (err) {
      const error = err as AxiosError;
      console.log(err);
      changeRequestStatus({ error: error.response?.data.message });
    }
    setDeletingFlavor(undefined);
  }

  const fetchFlavors = useCallback(
    async (params: FetchFlavorsParams) => {
      changeRequestStatus({ isLoading: true });

      try {
        const response = await Axios.get<FindAllFlavorsResponse>("/flavor", {
          params,
        });
        setFlavors(response.data);
      } catch (err) {
        const error = err as AxiosError;
        console.log(err);
        changeRequestStatus({ error: error.response?.data.message });
      }

      changeRequestStatus({ isLoading: false });
    },
    [changeRequestStatus]
  );

  useEffect(() => {
    fetchFlavors({ skip: skip, itemsAmount: pagination.itemsAmount, getDeleted: false });
  }, [skip, pagination.itemsAmount, fetchFlavors]);

  return (
    <ProductsComponentsContainer>
      <ProductsComponentsTitle>Sabores</ProductsComponentsTitle>

      <Formik
        enableReinitialize
        validateOnChange={false}
        validationSchema={getFlavorsFormValidationSchema(formModel)}
        initialValues={getFlavorsFormInitialValues(editFlavor)}
        onSubmit={submitHandler}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <AddProductsComponentsTitle>Adicionar sabor</AddProductsComponentsTitle>
            <InputTextFormik
              name={formModel.name.name}
              label={formModel.name.label}
              values={values.name}
              variant="outlined"
              helperText={formModel.name.requiredErrorMessage}
              style={{ width: "500px" }}
            />
            <ProductsComponentsButtonContainer isEdit={!!editFlavor}>
              {editFlavor && (
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
                  Adicionar
                </LoadingButton>
              </motion.div>
            </ProductsComponentsButtonContainer>
          </Form>
        )}
      </Formik>

      <Fragment>
        <TableTitle>Todos os sabores</TableTitle>

        <FlavorsTableContainer>
          {flavors && flavors.items.length > 0 && !requestStatus.isLoading && (
            <TableContainer component={Paper}>
              <Table classes={tableClasses}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <b>Sabor</b>
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
                  {flavors.items.map((flavor) => (
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

                          {deletingFlavor && deletingFlavor.id_sabor == flavor.id_sabor ? (
                            <CircularProgress size={16} color="secondary" />
                          ) : (
                            <ClickableItem
                              title="Excluir sabor"
                              scale={1.3}
                              onClick={() => !deletingFlavor && deleteFlavorHandler(flavor)}
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
          )}

          {requestStatus.isLoading && (
            <LoadingContainer>
              <CircularProgress size={30} color="primary" />
            </LoadingContainer>
          )}

          <TablePagination
            labelDisplayedRows={(info) => `página ${info.page + 1}`}
            labelRowsPerPage="Linhas por página"
            rowsPerPageOptions={itemsAmountOptions}
            component="div"
            count={flavors?.count || 0}
            rowsPerPage={pagination.itemsAmount}
            page={pagination.page}
            onPageChange={(event, page) => !requestStatus.isLoading && changePage(page)}
            onRowsPerPageChange={(event) =>
              !requestStatus.isLoading && changeItemsAmount(Number(event.target.value))
            }
          />
        </FlavorsTableContainer>
      </Fragment>
    </ProductsComponentsContainer>
  );
};

export default Flavors;
