import { PURPLE, PINK } from "@utils/colors";
import styled from "styled-components";

const Wrapper = styled.div`

  padding: 2rem 0;
  width: 100%;
  width: 85%;
  margin: 0 auto;
  & > h1 {
    font-size: 2.5rem;
    letter-spacing: 2px;
    padding: 1rem 0;
    color: ${PURPLE};
  }
`;

export default Wrapper;
