import React, { Fragment, useState } from "react";
import { FindDateFilter } from "../constants";
import { DateFilterContainer } from "./styled";

import { InputLabel, Select, Button, FormControl, MenuItem, TextField } from "@material-ui/core";

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

type DateFilerFormProps = {
  setFieldValue: SetFieldValue<IDateFilterFormValues>;
};

const DateFilter: React.FC<DateFilerFormProps> = ({ setFieldValue }) => {
  const [filterOptions] = useState<FindDateFilter>(FindDateFilter.TODAY);
  const [dateOption, setDateOption] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDateOption(event.target.value as string);
  };

  function getDateFilterText(filterOption?: FindDateFilter) {
    switch (filterOption) {
      case FindDateFilter.TODAY:
        return "Exibindo os pedidos de";

      case FindDateFilter.LAST_7_DAYS:
        return "Exibindo os pedidos dos últimos";

      case FindDateFilter.LAST_30_DAYS:
        return "Exibindo os pedidos dos últimos";

      case FindDateFilter.DATE:
        return "Exibindo os pedidos da";

      case undefined:
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

  const formModel = getDateFilterFormModel();

  return (
    <Fragment>
      <Formik
        enableReinitialize
        validateOnChange={false}
        validationSchema={getDateFilterFormValidationSchema(formModel)}
        initialValues={getDateFilterFormInitialValues()}
        onSubmit={console.log}
      >
        {({ values }) => (
          <DateFilterContainer>
            <h4>{getDateFilterText(filterOptions)}</h4>
            <FormControl variant="outlined" size="small" style={{ width: "180px" }}>
              <InputLabel id="demo-simple-select-outlined-label" />
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={dateOption}
                onChange={handleChange}
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
            <InputTextFormik
              name={formModel.date.name}
              label={formModel.date.label}
              values={values.date}
              helperText={formModel.date.requiredErrorMessage}
              variant="outlined"
              size="small"
              style={{ width: "150px" }}
              inputProps={{ style: { textAlign: "center" } }}
              onChange={dateInputChangeHandler.bind(null, setFieldValue)}
            />
            <Button variant="contained" color="primary">
              Filtrar
            </Button>
          </DateFilterContainer>
        )}
      </Formik>
    </Fragment>
  );
};

export default DateFilter;
