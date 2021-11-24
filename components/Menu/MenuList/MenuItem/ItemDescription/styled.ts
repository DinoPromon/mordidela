import styled from "styled-components";

import { ORANGE } from "@utils/colors";

const Wrapper = styled.div`
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
  background-color: ${ORANGE};

  cursor: pointer;

  & > span {
    letter-spacing: 1px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0 0.75rem;
  }
`;

export default Wrapper;
