import React, { Fragment, useCallback, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import { FaTrash } from "react-icons/fa/index";
import { BsPencil } from "react-icons/bs/index";

import Axios from "@api";
import useRequestState from "@hooks/useRequestState";
import ClickableItem from "@components/shared/ClickableItem";
import { PINK } from "@utils/colors";
import { InputTextFormik, LoadingButton } from "@components/shared";

import {
  CategoriesContainer,
  CategoriesTitle,
  CategoriesListWhitBorder,
  CategoriesIcons,
  AddCategoriesTitle,
  ButtonContainer,
} from "../Categories/styled";
import {
  getFlavorsFormInitialValues,
  getFlavorsFormValidationSchema,
  getFlavorsFormModel,
} from "./FormModel";
import { FlavorsListContainer, LoadingContainer } from "./styled";

import type ISabor from "@models/sabor";
import type { AxiosError } from "axios";
import type { IFlavorsFormValues } from "./FormModel";

const Flavors: React.FC = () => {
  const [requestStatus, changeRequestStatus] = useRequestState();
  const [flavors, setFlavors] = useState<ISabor[]>([]);
  const [editFlavor, setEditFlavor] = useState<ISabor>();

  const formModel = getFlavorsFormModel();

  async function submitHandler(values: IFlavorsFormValues) {
    try {
      if (editFlavor) {
        const response = await Axios.put<ISabor>(`/flavor/update/${editFlavor.id_sabor}`, {
          nome: values.name,
        });

        setFlavors((prevState) => {
          const index = prevState.findIndex((pFlavor) => pFlavor.id_sabor === editFlavor.id_sabor);

          if (index <= -1) return prevState;

          const newFlavors = [...prevState];
          newFlavors[index] = response.data;

          return newFlavors;
        });
      } else {
        const response = await Axios.post<ISabor>("/flavor/create", {
          nome: values.name,
        });
        setFlavors((prevState) => [...prevState, response.data]);
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(err);
      changeRequestStatus({ error: error.response?.data.message });
    }
  }

  async function deleteFlavorHandler(flavor: ISabor) {
    try {
      const response = await Axios.put<ISabor>(`/flavor/update/${flavor.id_sabor}`, {
        deletado: true,
      });

      console.log(response.data);

      setFlavors((prevState) =>
        prevState.filter((pFlavor) => pFlavor.id_sabor !== flavor.id_sabor)
      );
    } catch (err) {
      const error = err as AxiosError;
      console.log(err);
      changeRequestStatus({ error: error.response?.data.message });
    }
  }

  function editFlavorHandler(flavor: ISabor) {
    setEditFlavor(flavor);
  }

  function cancelHandler() {
    setEditFlavor(undefined);
  }

  const fetchFlavors = useCallback(async () => {
    changeRequestStatus({ isLoading: true });
    try {
      const response = await Axios.get<ISabor[]>("/flavor");

      setFlavors(response.data);
    } catch (err) {
      const error = err as AxiosError;
      console.log(err);
      changeRequestStatus({ error: error.response?.data.message });
    }

    changeRequestStatus({ isLoading: false });
  }, [changeRequestStatus]);

  useEffect(() => {
    fetchFlavors();
  }, [fetchFlavors]);

  return (
    <CategoriesContainer>
      <CategoriesTitle>Sabores</CategoriesTitle>
      <Fragment>
        {flavors.length > 0 && (
          <FlavorsListContainer>
            {flavors.map((flavor) => (
              <CategoriesListWhitBorder key={`${flavor.nome}-${flavor.id_sabor}`}>
                {flavor.nome}
                <CategoriesIcons>
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
                </CategoriesIcons>
              </CategoriesListWhitBorder>
            ))}
          </FlavorsListContainer>
        )}
        {requestStatus.isLoading && (
          <LoadingContainer>
            <CircularProgress size={30} color="primary" />
          </LoadingContainer>
        )}
      </Fragment>

      <Formik
        enableReinitialize
        validateOnChange={false}
        validationSchema={getFlavorsFormValidationSchema(formModel)}
        initialValues={getFlavorsFormInitialValues(editFlavor)}
        onSubmit={submitHandler}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <AddCategoriesTitle>Adicionar sabor</AddCategoriesTitle>
            <InputTextFormik
              name={formModel.name.name}
              label={formModel.name.label}
              values={values.name}
              variant="outlined"
              helperText={formModel.name.requiredErrorMessage}
              style={{ width: "500px" }}
            />
            <ButtonContainer isEdit={!!editFlavor}>
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
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </CategoriesContainer>
  );
};

export default Flavors;
