import { PINK } from "@utils/colors";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem 0;

  & > span {
    
    color: ${PINK};
  }
`;

export default Wrapper;