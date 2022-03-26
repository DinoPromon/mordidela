import React, { Fragment, useCallback, useState, useEffect } from "react";
import { PINK } from "@utils/colors";
import { FaTrash } from "react-icons/fa/index";
import { BsPencil } from "react-icons/bs/index";

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
} from "@components/shared/ProductsComponents";

import {
  getCategoriesFormInitialValues,
  getCategoriesFormValidationSchema,
  getCategoriesFormModel,
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
  makeStyles,
} from "@material-ui/core";

import type { AxiosError } from "axios";
import type ICategoria from "@models/categoria";
import type { FindAllCategoriesResponse } from "@my-types/responses";

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
  const [requestStatus, changeRequestStatus] = useRequestState({ error: "", isLoading: true });
  const [findParams, setFindParams] = useState<FetchCategoryParams>(INIT_FIND_PARAMS);
  const [categories, setCategories] = useState<CategoryData>();
  const [isInitialRequest, setIsInitialRequest] = useState(true);

  const formModel = getCategoriesFormModel();

  const useStyles = makeStyles({
    table: {
      minWidth: 600,
    },
  });

  const classes = useStyles();

  const changeCategories = useCallback((category: CategoryData) => {
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
  );

  function loadMoreHandler() {
    fetchCategories(findParams);
  }

  useEffect(() => {
    fetchCategories(INIT_FIND_PARAMS);
  }, [fetchCategories]);

  return (
    <Fragment>
      <ProductsComponentsContainer>
        <ProductsComponentsTitle>Categorias</ProductsComponentsTitle>

        <Formik
          enableReinitialize
          validateOnChange={false}
          validationSchema={getCategoriesFormValidationSchema(formModel)}
          initialValues={getCategoriesFormInitialValues()}
          onSubmit={console.log}
        >
          {({ values }) => (
            <Form>
              <AddProductsComponentsTitle>Adicionar categoria</AddProductsComponentsTitle>
              <InputTextFormik
                name={formModel.name.name}
                label={formModel.name.label}
                values={values.name}
                variant="outlined"
                helperText={formModel.name.requiredErrorMessage}
                style={{ width: "400px" }}
              />
              <ProductsComponentsButtonContainer>
                <Button variant="contained" color="secondary" type="submit">
                  Adicionar
                </Button>
              </ProductsComponentsButtonContainer>
            </Form>
          )}
        </Formik>

        {categories && categories.items.length > 0 && (
          <div>
            <TableTitle>
              <h3>Todos as categorias</h3>
              <FormControlLabel control={<Checkbox />} label="Exibir as categorias excluídas" />
            </TableTitle>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <b>Sabor</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Status</b>
                    </TableCell>
                    <TableCell>
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
                            title="Editar sabor"
                            /* onClick={() => editFlavorHandler(categories)} */
                          >
                            <BsPencil size={16} color={PINK} />
                          </ClickableItem>
                          <ClickableItem
                            title="Excluir sabor"
                            scale={1.3}
                            /* onClick={() => deleteFlavorHandler(categories)} */
                          >
                            <FaTrash size={16} color={PINK} />
                          </ClickableItem>
                        </ProductsComponentsIcons>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {isInitialRequest && requestStatus.isLoading && (
          <LoadingContainer>
            <CircularProgress size={30} color="primary" />
          </LoadingContainer>
        )}

        {categories && categories.count > findParams.skip && (
          <LoadingButton
            variant="contained"
            color="secondary"
            isLoading={requestStatus.isLoading}
            onClick={loadMoreHandler}
          >
            Carregar mais
          </LoadingButton>
        )}
      </ProductsComponentsContainer>
    </Fragment>
  );
};

export default Categories;
