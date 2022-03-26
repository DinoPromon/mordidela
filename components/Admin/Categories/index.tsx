import React, { Fragment, useCallback, useState, useEffect } from "react";
import { PINK } from "@utils/colors";
import { FaTrash } from "react-icons/fa/index";
import { BsPencil } from "react-icons/bs/index";
import { motion } from "framer-motion";

import Axios from "@api";
import useIsMounted from "@hooks/useIsMounted";
import useRequestState from "@hooks/useRequestState";
import ClickableItem from "@components/shared/ClickableItem";

import {
  AddProductsComponentsTitle,
  ProductsComponentsIcons,
  ProductsComponentsTitle,
  ProductsComponentsButtonContainer,
  ProductsComponentsContainer,
  LoadingContainer,
  TableTitle,
  CustomTableContainer,
  useTableStyles,
} from "@components/shared/ProductsComponents";

import {
  getCategoriesFormInitialValues,
  getCategoriesFormValidationSchema,
  getCategoriesFormModel,
  ICategoriesFormValues,
} from "./FormModel";

import { Formik, Form } from "formik";
import { InputTextFormik, LoadingButton } from "@components/shared";
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
  TablePagination
} from "@material-ui/core";

import type { AxiosError } from "axios";
import type ICategoria from "@models/categoria";
import type { FindAllCategoriesResponse } from "@my-types/responses";

import { useTablePagination } from "@hooks/useTablePagination";

type FetchCategoryParams = {
  getDeleted: boolean;
  skip: number;
  itemsAmount?: number;
};

type CategoryData = {
  items: ICategoria[];
  count: number;
};

const INIT_FIND_PARAMS: FetchCategoryParams = {
  getDeleted: false,
  skip: 0,
};

const Categories: React.FC = () => {

  const isMounted = useIsMounted();
  const tableClasses = useTableStyles();
  const [categories, setCategories] = useState<CategoryData>();
  const [editCategory, setEditCategory] = useState<ICategoria>();
  const [isInitialRequest, setIsInitialRequest] = useState(true);
  const [deletingCategory, setDeletingCategory] = useState<ICategoria>();
  const [pagination, skip, changePage, changeItemsAmount] = useTablePagination();
  const [findParams, setFindParams] = useState<FetchCategoryParams>(INIT_FIND_PARAMS);
  const [requestStatus, changeRequestStatus] = useRequestState({ error: "", isLoading: true });

  const itemsAmountOptions = [5, 10, 15];
  const formModel = getCategoriesFormModel();

  function removeCategory(category: ICategoria) {
    setCategories((prevState) => {
      if (!prevState) return prevState;

      return {
        items: prevState.items.filter((pCategory) => pCategory.id_categoria !== category.id_categoria),
        count: prevState.count - 1,
      };
    });
  }

  function updateCategory(category: ICategoria) {
    setCategories((prevState) => {
      if (!prevState) return prevState;

      const index = prevState.items.findIndex((pCategory) => pCategory.id_categoria === category.id_categoria);

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

  async function submitHandler(values: ICategoriesFormValues) {
    try {
      if (editCategory) {
        const response = await Axios.put<ICategoria>(`/category/update/${editCategory.id_categoria}`, {
          nome: values.name,
        });

        updateCategory(response.data);
      } else {
        await Axios.post<ICategoria>("/category/create", {
          nome: values.name,
        });
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(err);
      changeRequestStatus({ error: error.response?.data.message });
    }
  }

  async function deleteCategoryHandler(category: ICategoria) {
    setDeletingCategory(category);
    try {
      const response = await Axios.put<ICategoria>(`/category/update/${category.id_categoria}`, {
        deletado: true,
      });

      removeCategory(response.data);
    } catch (err) {
      const error = err as AxiosError;
      console.log(err);
      changeRequestStatus({ error: error.response?.data.message });
    }
    setDeletingCategory(undefined);
  }

/*   const changeCategories = useCallback((category: CategoryData) => {
    setCategories((prevState) => {
      if (!prevState) return { count: category.count, items: category.items };

      return {
        count: category.count,
        items: [...prevState.items, ...category.items],
      };
    });
  }, []);

  const fetchCategories = useCallback(
    async (params?: FetchCategoryParams) => {
      changeRequestStatus({ isLoading: true });

      try {
        const response = await Axios.get<FindAllCategoriesResponse>("/category", {
          params,
        });
        if (!isMounted.current) return;

        changeCategories(response.data);
        setIsInitialRequest(false);
        setFindParams((prevState) => ({
          ...prevState,
          skip: prevState.skip + response.data.items.length,
        }));
      } catch (err) {
        const error = err as AxiosError;
        console.log(error);
        if (!isMounted.current) return;

        changeRequestStatus({ error: error.response?.data.message });
      }

      changeRequestStatus({ isLoading: false });
    },
    [isMounted, changeRequestStatus, changeCategories]
  ); */

  const fetchCategories = useCallback(
    async (params: FetchCategoryParams) => {
      changeRequestStatus({ isLoading: true });

      try {
        const response = await Axios.get<FindAllCategoriesResponse>("/category", {
          params,
        });
        setCategories(response.data);
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
    fetchCategories({ skip: skip, itemsAmount: pagination.itemsAmount, getDeleted: false });
  }, [skip, pagination.itemsAmount, fetchCategories]);

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
                  Adicionar
                </LoadingButton>
              </motion.div>
            </ProductsComponentsButtonContainer>
          </Form>
        )}
      </Formik>

      <Fragment>
        <TableTitle>
          <h3>Todos as categorias</h3>
          <FormControlLabel control={<Checkbox />} label="Exibir as categorias excluídas" />
        </TableTitle>

        <CustomTableContainer>
          {categories && categories.items.length > 0 && !requestStatus.isLoading && (
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

                          {deletingCategory && deletingCategory.id_categoria == category.id_categoria ? (
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
          )}

          {requestStatus.isLoading && (
            <LoadingContainer>
              <CircularProgress size={30} color="primary" />
            </LoadingContainer>
          )}

          {categories && (
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
          )}
        </CustomTableContainer>
      </Fragment>
    </ProductsComponentsContainer>
  );
};

export default Categories;
