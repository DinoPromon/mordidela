import React from "react";
import { CentralizedLoadingContainer } from "./styled";
import CircularProgress from "@material-ui/core/CircularProgress";

const CentralizedLoading: React.FC = () => {
  return (
    <CentralizedLoadingContainer>
      <CircularProgress />
    </CentralizedLoadingContainer>
  );
};

export default CentralizedLoading;
