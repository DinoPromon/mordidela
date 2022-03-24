import React, { Fragment } from "react";
import { FindDateFilter } from "../constants";
import { DateFilterForm, ButtonContainer } from "./styled";

import { InputLabel, Select, Button, FormControl, MenuItem } from "@material-ui/core";

import {
  getDateFilterFormInitialValues,
  getDateFilterFormModel,
  getDateFilterFormValidationSchema,
  IDateFilterFormValues,
} from "./FormModel";

import { Formik } from "formik";
import { maskDate } from "@utils/formatters";
import { InputTextFormik } from "@components/shared";
import type { SetFieldValue } from "@my-types/formik";

type DateFilterProps = {
  onSubmit: (dateFilter?: FindDateFilter, date?: string) => Promise<void>;
};

const DateFilter: React.FC<DateFilterProps> = ({ onSubmit }) => {
  const formModel = getDateFilterFormModel();

  function getDateFilterText(filterOption: FindDateFilter | null) {
    switch (filterOption) {
      case FindDateFilter.TODAY:
        return "Exibindo os pedidos de";

      case FindDateFilter.LAST_7_DAYS:
        return "Exibindo os pedidos dos";

      case FindDateFilter.LAST_30_DAYS:
        return "Exibindo os pedidos dos";

      case FindDateFilter.DATE:
        return "Exibindo os pedidos da";

      case FindDateFilter.NONE:
        return "Exibindo todos os pedidos";

      default:
        return filterOption;
    }
  }

  function dateInputChangeHandler(
    setFieldValue: SetFieldValue<IDateFilterFormValues>,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const formatedDate = maskDate(event.target.value);
    setFieldValue("date", formatedDate);
  }

  async function submitHandler(values: IDateFilterFormValues) {
    await onSubmit(values.dateFilter, values.date);
  }

  return (
    <Formik
      enableReinitialize
      validateOnChange={false}
      /* validationSchema={getDateFilterFormValidationSchema(formModel)} */
      initialValues={getDateFilterFormInitialValues()}
      onSubmit={submitHandler}
    >
      {({ values, setFieldValue }) => (
        <DateFilterForm>
          <h4>{getDateFilterText(values.dateFilter)}</h4>
          <FormControl variant="outlined" size="small" style={{ width: "180px" }}>
            <InputLabel>{formModel.dateFilter.label}</InputLabel>
            <Select
              id={formModel.dateFilter.name}
              name={formModel.dateFilter.name}
              value={values.dateFilter}
              label={formModel.dateFilter.label}
              onChange={(event) => setFieldValue(formModel.dateFilter.name, event.target.value)}
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
              <MenuItem value={FindDateFilter.TODAY}>hoje</MenuItem>
              <MenuItem value={FindDateFilter.LAST_7_DAYS}>últimos 7 dias</MenuItem>
              <MenuItem value={FindDateFilter.LAST_30_DAYS}>últimos 30 dias</MenuItem>
              <MenuItem value={FindDateFilter.DATE}>data</MenuItem>
            </Select>
          </FormControl>

          {values.dateFilter === FindDateFilter.DATE && (
            <InputTextFormik
              name={formModel.date.name}
              label={formModel.date.label}
              values={values.date}
              helperText={formModel.date.requiredErrorMessage}
              variant="outlined"
              size="small"
              autoComplete="off"
              style={{ width: "150px" }}
              inputProps={{ style: { textAlign: "center" } }}
              onChange={dateInputChangeHandler.bind(null, setFieldValue)}
            />
          )}
          <ButtonContainer>
            <Button variant="contained" color="primary" type="submit">
              Filtrar
            </Button>
          </ButtonContainer>
        </DateFilterForm>
      )}
    </Formik>
  );
};

export default DateFilter;
