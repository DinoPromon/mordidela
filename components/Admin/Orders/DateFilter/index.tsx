import React, { useState } from "react";
import { FindDateFilter } from "../constants";
import { DateFilterContainer } from "./styled";

import { InputLabel, Select, Button, FormControl, MenuItem } from "@material-ui/core";

const DateFilter: React.FC = () => {
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

  return (
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
      <Button variant="contained" color="primary">
        Filtrar
      </Button>
      {/*         <TextField variant="outlined" size="small" select style={{ width: "120px" }} />
    <TextField
      size="small"
      label="Data"
      variant="outlined"
      style={{ width: "120px" }}
      inputProps={{ style: { textAlign: "center" } }}
    />
    <Button variant="contained" color="primary">
      Filtrar
    </Button> */}
    </DateFilterContainer>
  );
};

export default DateFilter;
