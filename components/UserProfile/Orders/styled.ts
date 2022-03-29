import { PURPLE } from "@utils/colors";
import styled from "styled-components";

export const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
`;

export const WarningMessage = styled.h4`
  text-align: center;
`;

export const ReloadContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  & > h4 {
    color: ${PURPLE};
  }
`;