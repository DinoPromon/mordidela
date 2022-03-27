import React, { Fragment, useCallback, useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa/index";
import { BsPencil } from "react-icons/bs/index";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
} from "@material-ui/core";

import Axios from "@api";
import useIsMounted from "@hooks/useIsMounted";
import useRequestState from "@hooks/useRequestState";
import ClickableItem from "@components/shared/ClickableItem";
import { PINK } from "@utils/colors";
import { GetDeleted } from "@utils/constants";
import { useTablePagination } from "@hooks/useTablePagination";
import { InputTextFormik, LoadingButton } from "@components/shared";
import {
  TableTitle,
  useTableStyles,
  LoadingContainer,
  CustomTableContainer,
  ProductsComponentsIcons,
  ProductsComponentsTitle,
  AddProductsComponentsTitle,
  ProductsComponentsContainer,
  ProductsComponentsButtonContainer,
} from "@components/shared/ProductsComponents";

import {
  getCategoriesFormModel,
  getCategoriesFormInitialValues,
  getCategoriesFormValidationSchema,
} from "./FormModel";

import type { AxiosError } from "axios";
import type { FormikHelpers } from "formik";
import type ICategoria from "@models/categoria";
import type { ICategoriesFormValues } from "./FormModel/index";
import type { FindAllCategoriesResponse } from "@my-types/responses";

type FetchCategoryParams = {
  getDeleted: GetDeleted;
  skip: number;
  itemsAmount?: number;
};

type CategoryData = {
  items: ICategoria[];
  count: number;
};

const Categories: React.FC = () => {
  const isMounted = useIsMounted();
  const tableClasses = useTableStyles();
  const [pagination, skip, changePage, changeItemsAmount] = useTablePagination();
  const [getDeleted, setGetDeleted] = useState<GetDeleted>(GetDeleted.FALSE);
  const [requestStatus, changeRequestStatus] = useRequestState({ error: "", isLoading: true });
  const [categories, setCategories] = useState<CategoryData>();
  const [editCategory, setEditCategory] = useState<ICategoria>();
  const [deletingCategory, setDeletingCategory] = useState<ICategoria>();

  const itemsAmountOptions = [5, 10, 15];
  const formModel = getCategoriesFormModel();

  function updateCategory(category: ICategoria) {
    setCategories((prevState) => {
      if (!prevState) return prevState;

      const index = prevState.items.findIndex(
        (pCategory) => pCategory.id_categoria === category.id_categoria
      );

      if (index <= -1) return prevState;

      const newCategories = [...prevState.items];
      newCategories[index] = category;

      return {
        ...prevState,
        items: newCategories,
      };
    });
  }

  function editCategoryHandler(category: ICategoria) {
    setEditCategory(category);
  }

  function cancelHandler() {
    setEditCategory(undefined);
  }

  async function submitHandler(
    values: ICategoriesFormValues,
    formikHelpers: FormikHelpers<ICategoriesFormValues>
  ) {
    try {
      if (editCategory) {
        const response = await Axios.put<ICategoria>(
          `/category/update/${editCategory.id_categoria}`,
          {
            nome: values.name,
          }
        );

        if (!isMounted.current) return;

        updateCategory(response.data);
      } else {
        await Axios.post<ICategoria>("/category/create", {
          nome: values.name,
        });

        if (!isMounted.current) return;

        fetchCategories({ skip, getDeleted, itemsAmount: pagination.itemsAmount });
      }

      formikHelpers.resetForm();
    } catch (err) {
      const error = err as AxiosError;
      console.log(err);
      changeRequestStatus({ error: error.response?.data.message });
    }
  }

  async function deleteCategoryHandler(category: ICategoria) {
    setDeletingCategory(category);
    try {
      await Axios.put<ICategoria>(`/category/update/${category.id_categoria}`, {
        deletado: true,
      });

      if (!isMounted.current) return;

      fetchCategories({ skip, getDeleted, itemsAmount: pagination.itemsAmount });
    } catch (err) {
      if (!isMounted.current) return;

      const error = err as AxiosError;
      console.log(err);
      changeRequestStatus({ error: error.response?.data.message });
    }
    setDeletingCategory(undefined);
  }

  const fetchCategories = useCallback(
    async (params: FetchCategoryParams) => {
      changeRequestStatus({ isLoading: true });

      try {
        const response = await Axios.get<FindAllCategoriesResponse>("/category", {
          params,
        });

        if (!isMounted.current) return;

        setCategories(response.data);
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
    fetchCategories({ skip, getDeleted, itemsAmount: pagination.itemsAmount });
  }, [skip, pagination.itemsAmount, fetchCategories, getDeleted]);

  return (
    <ProductsComponentsContainer>
      <ProductsComponentsTitle>Categorias</ProductsComponentsTitle>

      <Formik
        enableReinitialize
        validateOnChange={false}
        validationSchema={getCategoriesFormValidationSchema(formModel)}
        initialValues={getCategoriesFormInitialValues(editCategory)}
        onSubmit={submitHandler}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <AddProductsComponentsTitle>Criar categoria</AddProductsComponentsTitle>
            <InputTextFormik
              name={formModel.name.name}
              label={formModel.name.label}
              values={values.name}
              variant="outlined"
              helperText={formModel.name.requiredErrorMessage}
              style={{ width: "500px" }}
              autoComplete="off"
            />
            <ProductsComponentsButtonContainer isEdit={!!editCategory}>
              {editCategory && (
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
                  {editCategory ? "Editar" : "Adicionar"}
                </LoadingButton>
              </motion.div>
            </ProductsComponentsButtonContainer>
          </Form>
        )}
      </Formik>

      <Fragment>
        <TableTitle>
          <h3>Todos as categorias</h3>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(event, checked) =>
                  setGetDeleted(checked ? GetDeleted.TRUE : GetDeleted.FALSE)
                }
              />
            }
            label="Exibir as categorias excluídas"
          />
        </TableTitle>

        <CustomTableContainer>
          {categories && categories.items.length > 0 && !requestStatus.isLoading && (
            <Fragment>
              <TableContainer component={Paper}>
                <Table classes={tableClasses}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">
                        <b>Categoria</b>
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
                    {categories.items.map((category) => (
                      <TableRow key={category.id_categoria}>
                        <TableCell>{category.nome}</TableCell>

                        {category.deletado === false ? (
                          <TableCell align="center">Disponível</TableCell>
                        ) : (
                          <TableCell align="center">Excluído</TableCell>
                        )}

                        <TableCell>
                          <ProductsComponentsIcons>
                            <ClickableItem
                              scale={1.3}
                              title="Editar categoria"
                              onClick={() => editCategoryHandler(category)}
                            >
                              <BsPencil size={16} color={PINK} />
                            </ClickableItem>

                            {deletingCategory &&
                            deletingCategory.id_categoria == category.id_categoria ? (
                              <CircularProgress size={16} color="secondary" />
                            ) : (
                              <ClickableItem
                                title="Excluir categoria"
                                scale={1.3}
                                onClick={() => !deletingCategory && deleteCategoryHandler(category)}
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
                count={categories?.count || 0}
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

export default Categories;
