import React from "react";

import { HomeContainer } from "./styled";
import InputTextFormik from "@components/shared/InputTextFormik";

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <InputTextFormik variant="outlined" />
    </HomeContainer>
  );
};

export default Home;
