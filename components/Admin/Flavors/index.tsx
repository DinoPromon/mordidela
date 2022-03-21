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

import { FlavorsListContainer } from "./styled";

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
            <FlavorsListContainer>
              <CategoriesList>
                Bolinha de queijo
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
                Coxinha de frango
                <CategoriesIcons>
                  <ClickableItem title="Editar sabor" scale={1.3}>
                    <BsPencil size={16} color={PINK} />
                  </ClickableItem>
                  <ClickableItem title="Excluir sabor" scale={1.3}>
                    <FaTrash size={16} color={PINK} />
                  </ClickableItem>
                </CategoriesIcons>
              </CategoriesListWhitBorder>
              <CategoriesListWhitBorder>
                Coxinha de carne
                <CategoriesIcons>
                  <ClickableItem title="Editar sabor" scale={1.3}>
                    <BsPencil size={16} color={PINK} />
                  </ClickableItem>
                  <ClickableItem title="Excluir sabor" scale={1.3}>
                    <FaTrash size={16} color={PINK} />
                  </ClickableItem>
                </CategoriesIcons>
              </CategoriesListWhitBorder>
              <CategoriesListWhitBorder>
                Coxinha de presunto e queijo
                <CategoriesIcons>
                  <ClickableItem title="Editar sabor" scale={1.3}>
                    <BsPencil size={16} color={PINK} />
                  </ClickableItem>
                  <ClickableItem title="Excluir sabor" scale={1.3}>
                    <FaTrash size={16} color={PINK} />
                  </ClickableItem>
                </CategoriesIcons>
              </CategoriesListWhitBorder>
              <CategoriesListWhitBorder>
                Quibe
                <CategoriesIcons>
                  <ClickableItem title="Editar sabor" scale={1.3}>
                    <BsPencil size={16} color={PINK} />
                  </ClickableItem>
                  <ClickableItem title="Excluir sabor" scale={1.3}>
                    <FaTrash size={16} color={PINK} />
                  </ClickableItem>
                </CategoriesIcons>
              </CategoriesListWhitBorder>
            </FlavorsListContainer>

            <AddCategoriesTitle>Adicionar sabor</AddCategoriesTitle>
            <FormikForm>
              <InputTextFormik
                name={formModel.name.name}
                label={formModel.name.label}
                values={values.name}
                variant="outlined"
                helperText={formModel.name.requiredErrorMessage}
                style={{ width: "500px" }}
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
