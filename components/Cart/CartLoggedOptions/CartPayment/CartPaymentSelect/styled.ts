import styled from "styled-components";

import { PINK, PURPLE } from "@utils/colors";

const Wrapper = styled.div`
  & > h3 {
    display: flex;
    justify-content: center;
    margin-bottom: 0.5rem;
    color: ${PURPLE};
  }

  & > div {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`;

export default Wrapper;
