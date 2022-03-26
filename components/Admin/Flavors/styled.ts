import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";

export const useTableStyles = makeStyles((theme) => ({
  root: {
    minWidth: 600,
    borderRadius: 5,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
}));

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const TableTitle = styled.h3`
  text-align: center;
  margin-top: 2rem;
  padding-bottom: 1rem;
`;

export const FlavorsTableContainer = styled.div`
  overflow-x: auto;
`;
