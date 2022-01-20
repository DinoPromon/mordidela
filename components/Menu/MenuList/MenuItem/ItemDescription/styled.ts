import styled from "styled-components";

import { PINK } from "@utils/colors";

export const ItemDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
  color: white;
  padding: 1em 0;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background-color: ${PINK};
  cursor: pointer;

  & > span {
    font-size: 1rem;
    font-weight: 500;
    padding: 0 0.25rem;
  }
`;