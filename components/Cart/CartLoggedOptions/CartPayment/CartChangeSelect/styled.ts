import { PURPLE } from "@utils/colors";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;

  & > h3 {
    color: ${PURPLE};
  }
`;

export default Wrapper;
