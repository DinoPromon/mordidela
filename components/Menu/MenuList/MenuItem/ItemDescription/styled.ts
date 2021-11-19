import styled from "styled-components";

import { ORANGE } from "@utils/colors";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  /* justify-content: space-between; */
  justify-content: center;
  background-color: white;
  color: white;
  padding: 1em 0;
  background-color: ${ORANGE};
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  cursor: pointer;

  & > span {
    letter-spacing: 1px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0 0.75rem;
  }
`;

export default Wrapper;
