import React, { Fragment } from "react";
import { PINK } from "@utils/colors";
import { FaTrash } from "react-icons/fa/index";
import { BsPencil } from "react-icons/bs/index";
import ClickableItem from "@components/shared/ClickableItem";

import {
  CategoriesContainer,
  CategoriesTitle,
  CategoriesListContainer,
  CategoriesList,
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

import { Formik } from "formik";
import { FormikForm } from "@components/Login/styled";
import { InputTextFormik } from "@components/shared";
import { Button } from "@material-ui/core";

const Flavors: React.FC = () => {
  const formModel = getFlavorsFormModel();
  return (
    <Fragment>
      <Formik
        enableReinitialize
        validateOnChange={false}
        validationSchema={getFlavorsFormValidationSchema(formModel)}
        initialValues={getFlavorsFormInitialValues()}
        onSubmit={console.log}
      >
        {({ values }) => (
          <CategoriesContainer>
            <CategoriesTitle>Sabores</CategoriesTitle>
            <CategoriesListContainer>
              <CategoriesList>
                Cones
                <CategoriesIcons>
                  <ClickableItem title="Editar sabor" scale={1.3}>
                    <BsPencil size={16} color={PINK} />
                  </ClickableItem>
                  <ClickableItem title="Excluir sabor" scale={1.3}>
                    <FaTrash size={16} color={PINK} />
                  </ClickableItem>
                </CategoriesIcons>
              </CategoriesList>
              <CategoriesListWhitBorder>
                Pratos executivos
                <CategoriesIcons>
                  <ClickableItem title="Editar categoria" scale={1.3}>
                    <BsPencil size={16} color={PINK} />
                  </ClickableItem>
                  <ClickableItem title="Excluir categoria" scale={1.3}>
                    <FaTrash size={16} color={PINK} />
                  </ClickableItem>
                </CategoriesIcons>
              </CategoriesListWhitBorder>
              <CategoriesListWhitBorder>
                Lanches
                <CategoriesIcons>
                  <ClickableItem title="Editar categoria" scale={1.3}>
                    <BsPencil size={16} color={PINK} />
                  </ClickableItem>
                  <ClickableItem title="Excluir categoria" scale={1.3}>
                    <FaTrash size={16} color={PINK} />
                  </ClickableItem>
                </CategoriesIcons>
              </CategoriesListWhitBorder>
              <CategoriesListWhitBorder>
                Caixas
                <CategoriesIcons>
                  <ClickableItem title="Editar categoria" scale={1.3}>
                    <BsPencil size={16} color={PINK} />
                  </ClickableItem>
                  <ClickableItem title="Excluir categoria" scale={1.3}>
                    <FaTrash size={16} color={PINK} />
                  </ClickableItem>
                </CategoriesIcons>
              </CategoriesListWhitBorder>
              <CategoriesListWhitBorder>
                Cremes gelados
                <CategoriesIcons>
                  <ClickableItem title="Editar categoria" scale={1.3}>
                    <BsPencil size={16} color={PINK} />
                  </ClickableItem>
                  <ClickableItem title="Excluir categoria" scale={1.3}>
                    <FaTrash size={16} color={PINK} />
                  </ClickableItem>
                </CategoriesIcons>
              </CategoriesListWhitBorder>
              <CategoriesListWhitBorder>
                Bebidas
                <CategoriesIcons>
                  <ClickableItem title="Editar categoria" scale={1.3}>
                    <BsPencil size={16} color={PINK} />
                  </ClickableItem>
                  <ClickableItem title="Excluir categoria" scale={1.3}>
                    <FaTrash size={16} color={PINK} />
                  </ClickableItem>
                </CategoriesIcons>
              </CategoriesListWhitBorder>
            </CategoriesListContainer>

            <AddCategoriesTitle>Adicionar sabor</AddCategoriesTitle>
            <FormikForm>
              <InputTextFormik
                name={formModel.name.name}
                label={formModel.name.label}
                values={values.name}
                variant="outlined"
                helperText={formModel.name.requiredErrorMessage}
                style={{ width: "400px" }}
              />
              <ButtonContainer>
                <Button variant="contained" color="secondary" type="submit">
                  Adicionar
                </Button>
              </ButtonContainer>
            </FormikForm>
          </CategoriesContainer>
        )}
      </Formik>
    </Fragment>
  );
};

export default Flavors;
