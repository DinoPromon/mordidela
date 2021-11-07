import styled from "styled-components";

import { ORANGE } from "@utils/colors";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: white;
  color: white;
  /* color: black; */
  padding: 1.25em 0;
  /* border: 1px #ea8ac5 solid; */
  background-color: ${ORANGE};
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  
  & > span {
    letter-spacing: 1px;
    font-size: 1.25rem;
    font-weight: bold;
    padding: 0 0.75rem;
  }
`;

export default Wrapper;
