import React from "react";

import { HomeContainer, useStyles } from "./styled";
import TextField from "@material-ui/core/TextField";
import InputTextFormik from "@components/shared/InputTextFormik";



const Home: React.FC = () => {
  const classes = useStyles();
  return (
    <HomeContainer>
      <TextField
        className={classes.root}
        label="Nome"
        variant="outlined"
        color="primary"
        required
        fullWidth
        autoComplete="off"
      />
    </HomeContainer>
  );
};

export default Home;
